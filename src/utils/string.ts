import { isEmpty } from 'lodash';

type NameProps = {
  firstName: string | undefined;
  middleName: string | undefined;
  lastName: string | undefined;
};

/**
 * Format name object to full name string
 * @param {String} name.firstName - First Name
 * @param {String} name.middleName - Middle Name
 * @param {String} name.lastName - Last Name
 * @returns {String} Full Name
 */
export const formatName = ({ firstName, middleName, lastName }: NameProps) => {
  if (isEmpty(firstName) && !isEmpty(lastName)) return lastName;

  const name = [firstName, middleName, lastName];
  return name.filter(word => !isEmpty(word)).join(' ');
};

export const formatCurrency = () => {};
