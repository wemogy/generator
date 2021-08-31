import * as Generator from 'yeoman-generator';
import * as _ from 'lodash';

export default async function optionOrPrompt<T>(questions: Generator.Questions<T>): Promise<void> {
  const answers: any = {};

  if (!isQuestionsArray(questions)) {
    if (isQuestion(questions)) {
      return this.prompt(questions);
    }
    throw new Error('Observable is not supported');
  }

  for (const question of questions) {
    // add the option to the set of expected options
    this.option(question.name);

    // resolve the option from command
    const option = this.options[question.name];
    // if option is supplied
    if (option !== undefined) {
      // add to answers
      answers[question.name] = option;
      // skip the prompt
      continue;
    }

    if (typeof question.when === 'function') {
      // call the when resolver
      const shouldAskQuestion = await question.when(answers);
      // ignore the question if when result is falsy
      if (!shouldAskQuestion) {
        continue;
      }
      // remove the condition, because it is checked already
      delete question.when;
    }

    // recursive call to ask question or process questions
    const promptAnswers = await optionOrPrompt.bind(this)(question);
    // merge the suppied answers to all answers
    _.merge(answers, promptAnswers);
  }

  return answers;
}

function isQuestionsArray<T>(questions: Generator.Questions<T>): questions is Array<Generator.Question<T>> {
  return _.isArray(questions);
}

function isQuestion<T>(questions: Generator.Questions<T>): questions is Generator.Question<T> {
  return !_.isArray(questions);
}
