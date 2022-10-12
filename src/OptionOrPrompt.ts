import * as Generator from 'yeoman-generator';
import * as _ from 'lodash';

type FollowUpQuestion<
  A extends Generator.Answers = Generator.Answers,
  AFollowUp extends Generator.Answers = Generator.Answers
> = Generator.Question<A> & {
  type: 'confirm';
  followUpQuestions?: Generator.Questions<AFollowUp>;
};

type AdvancedQuestion<
  A extends Generator.Answers = Generator.Answers,
  AFollowUp extends Generator.Answers = Generator.Answers
> = Generator.Question<A> | FollowUpQuestion<A, AFollowUp>;

export type AdvancedQuestions<
  A extends Generator.Answers = Generator.Answers,
  AFollowUp extends Generator.Answers = Generator.Answers
> = AdvancedQuestion<A, AFollowUp> | Array<AdvancedQuestion<A, AFollowUp>>;

export default async function optionOrPrompt<T>(questions: AdvancedQuestions<T>): Promise<T> {
  if (!this.allAnswers) {
    this.allAnswers = {};
  }
  const answers: any = {};
  // if the question is a single question
  if (!isQuestionsArray(questions)) {
    const answer = await this.prompt(questions);

    await mergeFolloUpAnswersIn.bind(this)(answer, questions);

    return answer;
  }

  for (const question of questions as any) {
    // update the allAnswers
    _.merge(this.allAnswers, answers);

    // add the option to the set of expected options or arguments
    question.type === 'confirm'
      ? this.option(question.name)
      : this.argument(question.name, { type: String, required: false });

    // resolve the option from command
    const option = this.options[question.name];
    // if option is supplied
    if (option !== undefined) {
      // add to answers
      answers[question.name] = option;
      // followUp questions
      await mergeFolloUpAnswersIn.bind(this)(answers, question);
      // skip the prompt
      continue;
    }

    if (typeof question.when === 'function') {
      // call the when resolver
      const shouldAskQuestion = await question.when(this.allAnswers);
      // ignore the question if when result is falsy
      if (!shouldAskQuestion) {
        continue;
      }
      // remove the condition, because it is checked already
      delete question.when;
    }

    if (typeof question.default === 'function') {
      // call the default resolver
      question.default = question.default(this.allAnswers);
    }

    // recursive call to ask question or process questions
    const promptAnswers = await optionOrPrompt.bind(this)(question);
    // merge the suppied answers to all answers
    _.merge(answers, promptAnswers);
  }

  return answers;
}

async function mergeFolloUpAnswersIn(answers: any, question: AdvancedQuestion): Promise<void> {
  if (isFollowUpQuestion(question)) {
    if (!answers[question.name]) {
      return;
    }
    const followUpAnswers = await optionOrPrompt.bind(this)(question.followUpQuestions);
    _.merge(answers, followUpAnswers);
  }
}

function isQuestionsArray<T>(questions: AdvancedQuestions<T>): questions is Array<AdvancedQuestions<T>> {
  return _.isArray(questions);
}

function isFollowUpQuestion<
  A extends Generator.Answers = Generator.Answers,
  AFollowUp extends Generator.Answers = Generator.Answers
>(question: AdvancedQuestion<A, AFollowUp>): question is FollowUpQuestion<A, AFollowUp> {
  return question.type === 'confirm' && (question as any).followUpQuestions;
}
