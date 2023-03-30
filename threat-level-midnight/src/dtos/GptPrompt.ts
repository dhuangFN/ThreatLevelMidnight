import { PromptDto } from "./PromptDto";

export class GptPrompt extends PromptDto {

  constructor(prmpt) {
    super(prmpt);
    this.defaultPrompt = ``;
  }

  defaultPrompt: string;

  getGptPrompt(): string {
    return `${this.defaultPrompt} ${this.prompt}`;
  }
}
