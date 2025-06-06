describe('Form', () => {
  beforeEach(() => {
    cy.visit('/lazy/form');
  })

  describe('status updates', () => {
    it('should update Ionic form classes when calling form methods programmatically', async () => {
      cy.get('#input-touched').click();
      cy.get('#touched-input-test').should('have.class', 'ion-touched');
      cy.get('#input-otp-touched').click();
      cy.get('#touched-input-otp-number-test').should('have.class', 'ion-touched');
    });

    describe('markAllAsTouched', () => {
      it('should apply .ion-touched to nearest ion-item', () => {
        cy.get('#mark-all-touched-button').click();
        cy.get('form ion-item').each(item => {
          cy.wrap(item).should('have.class', 'ion-touched');
        });
      });
    });

  });

  describe('change', () => {
    it('should have default values', () => {
      testStatus('INVALID');
      cy.get('#submit').should('have.text', 'false');
      testData({
        datetime: '2010-08-20',
        select: null,
        toggle: false,
        input: '',
        input2: 'Default Value',
        inputMin: 1,
        inputMax: 1,
        inputOtp: null,
        inputOtpText: '',
        inputOtp2: 1234,
        checkbox: false,
        radio: null
      });
    });

    it('should become valid', () => {
      cy.get('ion-input.required').type('Some value');
      cy.get('ion-input.required input').blur();

      // Test number OTP input
      cy.get('#touched-input-otp-number-test input').first().type('5678');
      cy.get('#touched-input-otp-number-test input').last().focus().blur();


      // Test text OTP input
      cy.get('#touched-input-otp-text-test input').first().type('ABCD');
      cy.get('#touched-input-otp-text-test input').last().focus().blur();

      testStatus('INVALID');

      cy.get('ion-select').click();
      cy.get('ion-alert').should('exist').should('be.visible');
      // NES option
      cy.get('ion-alert .alert-radio-button:nth-of-type(2)').click();
      // Click confirm button
      cy.get('ion-alert .alert-button:not(.alert-button-role-cancel)').click();

      testStatus('VALID');

      testData({
        datetime: '2010-08-20',
        select: 'nes',
        toggle: false,
        input: 'Some value',
        input2: 'Default Value',
        inputMin: 1,
        inputMax: 1,
        inputOtp: 5678,
        inputOtpText: 'ABCD',
        inputOtp2: 1234,
        checkbox: false,
        radio: null
      });
    });

    it('ion-toggle should change', () => {
      cy.get('form ion-toggle').click();
      testData({
        datetime: '2010-08-20',
        select: null,
        toggle: true,
        input: '',
        input2: 'Default Value',
        inputMin: 1,
        inputMax: 1,
        inputOtp: null,
        inputOtpText: '',
        inputOtp2: 1234,
        checkbox: false,
        radio: null
      });
    });

    it('ion-checkbox should change', () => {
      cy.get('ion-checkbox').click();
      testData({
        datetime: '2010-08-20',
        select: null,
        toggle: false,
        input: '',
        input2: 'Default Value',
        inputMin: 1,
        inputMax: 1,
        inputOtp: null,
        inputOtpText: '',
        inputOtp2: 1234,
        checkbox: true,
        radio: null
      });
    });

    it('ion-radio should change', () => {
      cy.get('ion-radio').click();
      testData({
        datetime: '2010-08-20',
        select: null,
        toggle: false,
        input: '',
        input2: 'Default Value',
        inputMin: 1,
        inputMax: 1,
        inputOtp: null,
        inputOtpText: '',
        inputOtp2: 1234,
        checkbox: false,
        radio: 'nes',
      });
    });

    it('ion-input-otp should change', () => {
      // Test number OTP input
      cy.get('#touched-input-otp-number-test input').first().type('5678');
      cy.get('#touched-input-otp-number-test input').last().focus().blur();

      // Test text OTP input
      cy.get('#touched-input-otp-text-test input').first().type('ABCD');
      cy.get('#touched-input-otp-text-test input').last().focus().blur();

      testData({
        datetime: '2010-08-20',
        select: null,
        toggle: false,
        input: '',
        input2: 'Default Value',
        inputMin: 1,
        inputMax: 1,
        inputOtp: 5678,
        inputOtpText: 'ABCD',
        inputOtp2: 1234,
        checkbox: false,
        radio: null
      });
    });

    it('should submit', () => {
      cy.get('#set-values').click();
      cy.get('#submit-button').click();
      cy.get('#submit').should('have.text', 'true');
    });

    it('ion-input-otp should validate both number and text types', () => {
      // Test number OTP validation
      cy.get('#touched-input-otp-number-test').should('have.class', 'ng-invalid');
      cy.get('#touched-input-otp-number-test input').first().type('5678');
      cy.get('#touched-input-otp-number-test input').last().focus().blur();
      cy.get('#touched-input-otp-number-test').should('have.class', 'ng-valid');

      // Test text OTP validation
      cy.get('#touched-input-otp-text-test').should('have.class', 'ng-invalid');
      cy.get('#touched-input-otp-text-test input').first().type('ABCD');
      cy.get('#touched-input-otp-text-test input').last().focus().blur();
      cy.get('#touched-input-otp-text-test').should('have.class', 'ng-valid');
    });

    // Add test for partial OTP input validation
    it('ion-input-otp should remain invalid when partially filled', () => {
      // Test number OTP with only first digit
      cy.get('#touched-input-otp-number-test').should('have.class', 'ng-invalid');
      cy.get('#touched-input-otp-number-test input').first().type('5');
      cy.get('#touched-input-otp-number-test input').eq(1).focus().blur();
      cy.get('#touched-input-otp-number-test').should('have.class', 'ng-invalid');

      // Test text OTP with only first character
      cy.get('#touched-input-otp-text-test').should('have.class', 'ng-invalid');
      cy.get('#touched-input-otp-text-test input').first().type('A');
      cy.get('#touched-input-otp-text-test input').eq(1).focus().blur();
      cy.get('#touched-input-otp-text-test').should('have.class', 'ng-invalid');

      // Verify form status is still invalid
      testStatus('INVALID');
    });
  });

  describe('blur', () => {
    it('ion-toggle should change only after blur', () => {
      cy.get('form ion-toggle').click();
      testData({
        datetime: '2010-08-20',
        select: null,
        toggle: true,
        input: '',
        input2: 'Default Value',
        inputMin: 1,
        inputMax: 1,
        inputOtp: null,
        inputOtpText: '',
        inputOtp2: 1234,
        checkbox: false,
        radio: null
      });
      cy.get('ion-checkbox').click();
      testData({
        datetime: '2010-08-20',
        select: null,
        toggle: true,
        input: '',
        input2: 'Default Value',
        inputMin: 1,
        inputMax: 1,
        inputOtp: null,
        inputOtpText: '',
        inputOtp2: 1234,
        checkbox: true,
        radio: null
      });
    });
  });

  describe('validators', () => {

    it('ion-input should error with min set', () => {
      const control = cy.get('form ion-input[formControlName="inputMin"]');

      control.should('have.class', 'ng-valid');

      control.type('{backspace}0');

      control.within(() => cy.get('input').blur());

      control.should('have.class', 'ng-invalid');
    });

    it('ion-input should error with max set', () => {
      const control = cy.get('form ion-input[formControlName="inputMax"]');

      control.should('have.class', 'ng-valid');

      control.type('2');
      control.within(() => cy.get('input').blur());

      control.should('have.class', 'ng-invalid');
    });

  });
});

function testStatus(status) {
  cy.get('#status').should('have.text', status);
}

function testData(data) {
  cy.get('#data').invoke('text').then(text => {
    const value = JSON.parse(text);
    console.log(value, data);
    expect(value).to.deep.equal(data);
  })
}
