import moment from 'moment';

export const validateDate = (date: Date) => {
    const now = moment().startOf('day').toDate();
    if (date < now) {
        return false; //date is before today's date
    } else {
        return true; // date is after today's date
    }
}