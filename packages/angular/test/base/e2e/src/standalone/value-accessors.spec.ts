describe('Value Accessors', () => {

  describe('Checkbox', () => {
    beforeEach(() => cy.visit('/standalone/value-accessors/checkbox'));

    it('should update the form value', () => {
      cy.get('#formValue').should('have.text', JSON.stringify({ checkbox: false }, null, 2));
      cy.get('ion-checkbox').should('have.class', 'ion-pristine');

      cy.get('ion-checkbox').click();

      cy.get('#formValue').should('have.text', JSON.stringify({ checkbox: true }, null, 2));
      cy.get('ion-checkbox').should('have.class', 'ion-dirty');
      cy.get('ion-checkbox').should('have.class', 'ion-valid');
    });
  });

  describe('Input', () => {
    beforeEach(() => cy.visit('/standalone/value-accessors/input'));

    it('should update the form value', () => {
      cy.get('#formValue').should('have.text', JSON.stringify({
        inputString: '',
        inputNumber: ''
      }, null, 2));
      cy.get('ion-input[formControlName="inputString"]').should('have.class', 'ion-pristine');
      cy.get('ion-input[formControlName="inputNumber"]').should('have.class', 'ion-pristine');

      cy.get('ion-input[formControlName="inputString"]').should('have.class', 'ion-invalid');
      cy.get('ion-input[formControlName="inputNumber"]').should('have.class', 'ion-invalid');

      cy.get('ion-input[formControlName="inputString"] input').type('test');
      cy.get('ion-input[formControlName="inputString"] input').blur();

      cy.get('ion-input[formControlName="inputNumber"] input').type(1);
      cy.get('ion-input[formControlName="inputNumber"] input').blur();

      cy.get('#formValue').should('have.text', JSON.stringify({
        inputString: 'test',
        inputNumber: 1
      }, null, 2));

      cy.get('ion-input[formControlName="inputString"]').should('have.class', 'ion-dirty');
      cy.get('ion-input[formControlName="inputNumber"]').should('have.class', 'ion-dirty');

      cy.get('ion-input[formControlName="inputString"]').should('have.class', 'ion-valid');
      cy.get('ion-input[formControlName="inputNumber"]').should('have.class', 'ion-valid');

    });
  });

  describe('Radio Group', () => {
    beforeEach(() => cy.visit('/standalone/value-accessors/radio-group'));

    it('should update the form value', () => {
      cy.get('#formValue').should('have.text', JSON.stringify({ radioGroup: '1' }, null, 2));
      cy.get('ion-radio-group').should('have.class', 'ion-pristine');

      cy.get('ion-radio').contains('Two').click();

      cy.get('#formValue').should('have.text', JSON.stringify({ radioGroup: '2' }, null, 2));
      cy.get('ion-radio-group').should('have.class', 'ion-dirty');
      cy.get('ion-radio-group').should('have.class', 'ion-valid');
    });
  });

  describe('Searchbar', () => {
    beforeEach(() => cy.visit('/standalone/value-accessors/searchbar'));

    it('should update the form value', () => {
      cy.get('#formValue').should('have.text', JSON.stringify({ searchbar: '' }, null, 2));
      cy.get('ion-searchbar').should('have.class', 'ion-pristine');
      cy.get('ion-searchbar').should('have.class', 'ion-invalid');

      cy.get('ion-searchbar').type('test');
      cy.get('ion-searchbar input').blur();

      cy.get('#formValue').should('have.text', JSON.stringify({ searchbar: 'test' }, null, 2));
      cy.get('ion-searchbar').should('have.class', 'ion-dirty');
      cy.get('ion-searchbar').should('have.class', 'ion-valid');
    });
  });

  describe('Segment', () => {
    beforeEach(() => cy.visit('/standalone/value-accessors/segment'));

    it('should update the form value', () => {
      cy.get('#formValue').should('have.text', JSON.stringify({ segment: 'Paid' }, null, 2));
      cy.get('ion-segment').should('have.class', 'ion-pristine');

      cy.get('ion-segment-button').eq(1).click();

      cy.get('#formValue').should('have.text', JSON.stringify({ segment: 'Free' }, null, 2));
      cy.get('ion-segment').should('have.class', 'ion-dirty');
      cy.get('ion-segment').should('have.class', 'ion-valid');
    });
  });

  describe('Select', () => {
    beforeEach(() => cy.visit('/standalone/value-accessors/select'));

    it('should update the form value', () => {
      cy.get('#formValue').should('have.text', JSON.stringify({ select: 'bananas' }, null, 2));
      cy.get('ion-select').should('have.class', 'ion-pristine');

      cy.get('ion-select').click();
      cy.get('ion-popover').should('be.visible');

      cy.get('ion-popover ion-radio-group ion-radio').first().click();

      cy.get('#formValue').should('have.text', JSON.stringify({ select: 'apples' }, null, 2));
      cy.get('ion-select').should('have.class', 'ion-dirty');
      cy.get('ion-select').should('have.class', 'ion-valid');
    });
  });

  describe('Textarea', () => {
    beforeEach(() => cy.visit('/standalone/value-accessors/textarea'));

    it('should update the form value', () => {
      cy.get('#formValue').should('have.text', JSON.stringify({ textarea: '' }, null, 2));
      cy.get('ion-textarea').should('have.class', 'ion-pristine');
      cy.get('ion-textarea').should('have.class', 'ion-invalid');

      cy.get('ion-textarea').click();
      cy.get('ion-textarea').type('test');

      cy.get('#formValue').should('have.text', JSON.stringify({ textarea: 'test' }, null, 2));
      cy.get('ion-textarea').should('have.class', 'ion-dirty');
      cy.get('ion-textarea').should('have.class', 'ion-valid');
    });
  });

  describe('Toggle', () => {
    beforeEach(() => cy.visit('/standalone/value-accessors/toggle'));

    it('should update the form value', () => {
      cy.get('#formValue').should('have.text', JSON.stringify({ toggle: false }, null, 2));
      cy.get('ion-toggle').should('have.class', 'ion-pristine');

      cy.get('ion-toggle').click();

      cy.get('#formValue').should('have.text', JSON.stringify({ toggle: true }, null, 2));
      cy.get('ion-toggle').should('have.class', 'ion-dirty');
      cy.get('ion-toggle').should('have.class', 'ion-valid');
    });
  });

  describe('Input OTP', () => {
    beforeEach(() => cy.visit('/standalone/value-accessors/input-otp'));

    it('should update the form value', () => {
      cy.get('#formValue').should('have.text', JSON.stringify({
        inputOtpString: '',
        inputOtpNumber: ''
      }, null, 2));
      cy.get('ion-input-otp[formControlName="inputOtpString"]').should('have.class', 'ion-pristine');
      cy.get('ion-input-otp[formControlName="inputOtpNumber"]').should('have.class', 'ion-pristine');

      cy.get('ion-input-otp[formControlName="inputOtpString"]').should('have.class', 'ion-invalid');
      cy.get('ion-input-otp[formControlName="inputOtpNumber"]').should('have.class', 'ion-invalid');

      // Type into the string OTP input
      cy.get('ion-input-otp[formControlName="inputOtpString"] input').eq(0).type('a');
      cy.get('ion-input-otp[formControlName="inputOtpString"] input').eq(1).type('b');
      cy.get('ion-input-otp[formControlName="inputOtpString"] input').eq(2).type('c');
      cy.get('ion-input-otp[formControlName="inputOtpString"] input').eq(3).type('d');
      cy.get('ion-input-otp[formControlName="inputOtpString"] input').eq(3).blur();

      // Type into the number OTP input
      cy.get('ion-input-otp[formControlName="inputOtpNumber"] input').eq(0).type('1');
      cy.get('ion-input-otp[formControlName="inputOtpNumber"] input').eq(1).type('2');
      cy.get('ion-input-otp[formControlName="inputOtpNumber"] input').eq(2).type('3');
      cy.get('ion-input-otp[formControlName="inputOtpNumber"] input').eq(3).type('4');
      cy.get('ion-input-otp[formControlName="inputOtpNumber"] input').eq(3).blur();

      cy.get('#formValue').should('have.text', JSON.stringify({
        inputOtpString: 'abcd',
        inputOtpNumber: 1234
      }, null, 2));

      cy.get('ion-input-otp[formControlName="inputOtpString"]').should('have.class', 'ion-dirty');
      cy.get('ion-input-otp[formControlName="inputOtpNumber"]').should('have.class', 'ion-dirty');

      cy.get('ion-input-otp[formControlName="inputOtpString"]').should('have.class', 'ion-valid');
      cy.get('ion-input-otp[formControlName="inputOtpNumber"]').should('have.class', 'ion-valid');
    });

    it('should remain invalid when partially filled', () => {
      cy.get('#formValue').should('have.text', JSON.stringify({
        inputOtpString: '',
        inputOtpNumber: ''
      }, null, 2));
      cy.get('ion-input-otp[formControlName="inputOtpString"]').should('have.class', 'ion-pristine');
      cy.get('ion-input-otp[formControlName="inputOtpNumber"]').should('have.class', 'ion-pristine');

      cy.get('ion-input-otp[formControlName="inputOtpString"]').should('have.class', 'ion-invalid');
      cy.get('ion-input-otp[formControlName="inputOtpNumber"]').should('have.class', 'ion-invalid');

      // Type only 2 characters into the string OTP input
      cy.get('ion-input-otp[formControlName="inputOtpString"] input').eq(0).type('a');
      cy.get('ion-input-otp[formControlName="inputOtpString"] input').eq(1).type('b');
      cy.get('ion-input-otp[formControlName="inputOtpString"] input').eq(2).blur();

      // Type only 2 characters into the number OTP input
      cy.get('ion-input-otp[formControlName="inputOtpNumber"] input').eq(0).type('1');
      cy.get('ion-input-otp[formControlName="inputOtpNumber"] input').eq(1).type('2');
      cy.get('ion-input-otp[formControlName="inputOtpNumber"] input').eq(2).blur();

      cy.get('#formValue').should('have.text', JSON.stringify({
        inputOtpString: 'ab',
        inputOtpNumber: 12
      }, null, 2));

      cy.get('ion-input-otp[formControlName="inputOtpString"]').should('have.class', 'ion-dirty');
      cy.get('ion-input-otp[formControlName="inputOtpNumber"]').should('have.class', 'ion-dirty');

      // Verify both inputs remain invalid when partially filled
      cy.get('ion-input-otp[formControlName="inputOtpString"]').should('have.class', 'ion-invalid');
      cy.get('ion-input-otp[formControlName="inputOtpNumber"]').should('have.class', 'ion-invalid');
    });
  });

});
