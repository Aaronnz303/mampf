import { expect, Page } from "../_support/fixtures";

export class SubmissionsPage {
  readonly page: Page;
  readonly link: string;

  constructor(page: Page, lectureId: number) {
    this.page = page;
    this.link = `/lectures/${lectureId}/submissions`;
  }

  async goto() {
    await this.page.goto(this.link);
  }

  /**
   * Uploads a submission file.
   *
   * Adapted from: https://playwright.dev/docs/input#upload-files
   */
  async uploadSubmission(filePath = "e2e/files/manuscript.pdf") {
    await expect(this.page.getByText("invitations to")).toBeVisible();

    const fileChooserPromise = this.page.waitForEvent("filechooser"); // no await
    await this.page.getByRole("button", { name: "files" }).click();
    const fileChooser = await fileChooserPromise;
    await fileChooser.setFiles(filePath);

    await expect(this.page.getByText("correct size")).toBeVisible();
    await this.page.getByRole("checkbox", { name: "I assure that" }).check();
    await this.page.getByRole("button", { name: "upload" }).click();
    await expect(this.page.getByText("upload successful")).toBeVisible();
  }

  async createSubmission() {
    await this.page.getByRole("button", { name: "create" }).click();
    await this.uploadSubmission();

    const saveRequestPromise = this.page.waitForResponse("/submissions");
    await this.page.getByRole("button", { name: "save" }).click();
    await saveRequestPromise;

    await this.page.pause();
    await expect(this.page.getByTestId("submission-token").last()).toBeVisible();
    const token = (await this.page.getByTestId("submission-token").last().innerText()).trim();

    await expect(this.page.getByRole("button", { name: "edit" })).toBeVisible();

    return token;
  }

  async joinSubmission(token: string) {
    await this.page.getByRole("button", { name: "join" }).click(); // join submission button
    await this.page.getByRole("textbox").fill(token); // fill token input field
    await this.page.getByRole("button", { name: "join" }).click();
    await expect(this.page.getByRole("button", { name: "leave" })).toBeVisible(); // confirmation visible
  }

  async acceptSubmissionInvite(idx: number = 0) {
    await this.page.getByTestId(`accept-invite-${idx}`).click(); // click accept invite button
  }
}
