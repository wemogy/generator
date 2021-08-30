import * as Generator from 'yeoman-generator';
import * as _ from 'lodash';
import * as q from 'q';

export default function optionOrPrompt<T>(questions: Generator.Questions<T>, callback?: any): void {
  // This method will only show prompts that haven't been supplied as options. This makes the generator more composable.
  const filteredQuestions: Generator.Questions<T>[] = [];
  const props: any = {};

  if (!isQuestionsArray(questions)) {
    throw new Error('Only array is supported');
  }
  const backup: any = this;
  const promptNotSuppliedOptions = (_notSuppliedOptions: any, props: any, callback: any): void => {
    // The when functions that may be specified with a prompt should receive all the already given answers.
    // That's why we have to do this overcomplex looking approach with promise (to make sure every when function
    // gets the latest answers given).
    this.log('BF2');
    const prompts = filteredQuestions.map(filteredQuestion => {
      if (!isQuestion(filteredQuestion)) {
        throw new Error('filteredQuestion array not supported now.');
      }

      return (() => {
        var promise = q.defer();
        this.log('TEST 1');
        var isWhenConditionFulfilled =
          typeof filteredQuestion.when !== 'function' ||
          (typeof filteredQuestion.when === 'function' && filteredQuestion.when(props));

        if (isWhenConditionFulfilled) {
          delete filteredQuestion.when;

          this.log('TEST isWhenConditionFulfilled BF', this);
          backup.prompt(filteredQuestion, (mergeProps: any) => {
            this.log('CALLBACK ');
            // Merge mergeProps into props/
            _.assign(props, mergeProps);
            promise.resolve();
          });
          this.log('TEST isWhenConditionFulfilled AF');
        } else {
          promise.resolve();
        }
        this.log('TEST RETURN');
        return promise.promise;
      }).bind(this);
    });

    this.log('AF2', typeof prompts[0]);
    this.log('AF2 - log', prompts[0]);
    let currentPrompt = prompts[0]();
    this.log('AF2.1');
    for (var i = 1; i < questions.length; i++) {
      this.log('FOR' + i);
      currentPrompt = currentPrompt.then(prompts[i]);
    }
    this.log('AF3');
    currentPrompt.then(() => {
      callback && callback(props);
    });
  };

  questions.forEach((question): void => {
    this.option(question.name);
    const option = this.options[question.name];

    if (option !== undefined) {
      // Options supplied, add to props
      props[question.name] = option;
    } else {
      // No option supplied, user will be prompted
      filteredQuestions.push(question);
    }
  }, this);

  this.log('HI');

  if (filteredQuestions.length) {
    // Some options were not supplied, prompting required.
    this.log('BEF');
    promptNotSuppliedOptions(filteredQuestions, props, callback);
    this.log('AF');
  } else {
    // No prompting required call the callback right away.
    callback && callback(props);
  }
}

function isQuestionsArray<T>(questions: Generator.Questions<T>): questions is Array<Generator.Question<T>> {
  return _.isArray(questions);
}

function isQuestion<T>(questions: Generator.Questions<T>): questions is Generator.Question<T> {
  return !_.isArray(questions);
}
