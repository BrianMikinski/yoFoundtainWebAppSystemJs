/// <reference path="../../../typings/index.d.ts" />

import * as angular from 'angular';
import 'angular-mocks';
import {TodoTextInput} from './TodoTextInput.ts';

describe('TodoTextInput component', () => {
  class MockTodoService {
  }

  beforeEach(() => {
    angular
      .module('todoTextInput', ['src/app/components/TodoTextInput.html'])
      .service('todoService', MockTodoService)
      .component('todoTextInput', TodoTextInput);
    module('todoTextInput');
  });

  it('should render correctly', inject(($rootScope: ng.IRootScopeService, $compile: ng.ICompileService) => {
    const $scope = $rootScope.$new();
    const element = $compile('<todo-text-input></todo-text-input>')($scope);
    $scope.$digest();
    const textInput = element.find('input');
    expect(textInput.attr('type')).toEqual('text');
  }));

  it('should bind the text to the element', inject($componentController => {
    const bindings = {
      text: 'Hello'
    };
    const component = $componentController('todoTextInput', {}, bindings);
    expect(component.text).toEqual('Hello');
  }));

  it('should call focus on element construction', inject($componentController => {
    const focusSpy = jasmine.createSpy('focusSpy');
    const bindings = {
      text: 'Hello',
      focus: focusSpy
    };
    const component = $componentController('todoTextInput', {}, bindings);
    expect(component.focus).toHaveBeenCalled();
  }));

  it('should not call focus on element construction', inject($componentController => {
    const focusSpy = jasmine.createSpy('focusSpy');
    const bindings = {
      focus: focusSpy
    };
    const component = $componentController('todoTextInput', {}, bindings);
    expect(component.focus).not.toHaveBeenCalled();
  }));

  it('should call onSave', inject($componentController => {
    const bindings = {
      onSave: () => {return; },
      newTodo: false,
      text: 'Hello'
    };
    const component = $componentController('todoTextInput', {}, bindings);
    spyOn(component, 'onSave').and.callThrough();
    component.handleBlur();
    expect(component.onSave).toHaveBeenCalled();
  }));

  it('should not call onSave', inject($componentController => {
    const bindings = {
      onSave: () => {return; },
      newTodo: true,
      text: 'Hello'
    };
    const component = $componentController('todoTextInput', {}, bindings);
    spyOn(component, 'onSave').and.callThrough();
    component.handleBlur();
    expect(component.onSave).not.toHaveBeenCalled();
  }));

  it('should call onSave and clear text', inject($componentController => {
    const bindings = {
      onSave: () => {return; },
      newTodo: true,
      text: 'Hello'
    };
    const component = $componentController('todoTextInput', {}, bindings);
    spyOn(component, 'onSave').and.callThrough();
    component.handleSubmit({keyCode: 13});
    expect(component.onSave).toHaveBeenCalled();
    expect(component.text).toEqual('');
  }));
});
