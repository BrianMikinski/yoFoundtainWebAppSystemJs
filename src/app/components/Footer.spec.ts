/// <reference path="../../../typings/index.d.ts" />

import * as angular from 'angular';
import 'angular-mocks';
import {Footer} from './Footer.ts';

describe('Footer component', () => {
  beforeEach(() => {
    angular
      .module('footerComponent', ['src/app/components/Footer.html'])
      .component('footerComponent', Footer);
    module('footerComponent');
  });

  interface IMyScope extends ng.IScope {
    activeCount: number;
  }

  it('should render correctly', inject(($rootScope: ng.IRootScopeService, $compile: ng.ICompileService) => {
    const $scope: IMyScope = <IMyScope> $rootScope.$new();
    $scope.activeCount = 2;
    const element = $compile('<footer-component active-count="activeCount"></footer-component>')($scope);
    $scope.$digest();
    const footer = element.find('strong');
    expect(footer.html().trim()).toEqual('2');
  }));

  it('shoud call onClearCompleted', inject($componentController => {
    const bindings = {
      onClearCompleted: () => {
        return;
      }
    };
    const component = $componentController('footerComponent', {}, bindings);
    spyOn(component, 'onClearCompleted').and.callThrough();
    component.handleClear();
    expect(component.onClearCompleted).toHaveBeenCalled();
  }));

  it('shoud call onShow', inject($componentController => {
    const bindings = {
      onShow: () => {
        return;
      }
    };
    const component = $componentController('footerComponent', {}, bindings);
    spyOn(component, 'onShow').and.callThrough();
    component.handleChange('show_all');
    expect(component.onShow).toHaveBeenCalledWith({filter: 'show_all'});
  }));
});

