import React from 'react';
import {render} from '../../../../jest/test-utils';
import {PalsScreen} from '../PalsScreen';
import {authService} from '../../../services';

describe('PalsScreen', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    authService.isAuthenticated = false;
  });

  it('should render coming soon notice without crashing', () => {
    const {getByText, getAllByText} = render(<PalsScreen />, {
      withNavigation: true,
      withSafeArea: true,
      withBottomSheetProvider: true,
    });

    expect(getByText('AI Pals & Characters')).toBeTruthy();
    expect(getByText('COMING SOON IN NEXT UPDATE')).toBeTruthy();
    expect(getAllByText('Sign In to PalsHub').length).toBeGreaterThan(0);
  });

  it('should show user email when authenticated', () => {
    authService.isAuthenticated = true;
    (authService as any).user = {email: 'user@test.com'};

    const {getByText} = render(<PalsScreen />, {
      withNavigation: true,
      withSafeArea: true,
      withBottomSheetProvider: true,
    });

    expect(getByText('Signed in as user@test.com')).toBeTruthy();
    expect(getByText('Manage Account')).toBeTruthy();
  });
});
