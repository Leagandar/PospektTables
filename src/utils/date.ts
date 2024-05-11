const getTableDate = (dateObject: Date) => {
    const locale = 'ru';
    const options: Intl.DateTimeFormatOptions = {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        hour12: false
    };

    const dateFormatter = new Intl.DateTimeFormat(locale, options);
    return dateFormatter.format(dateObject);
}

const isDateInRange = (target: Date, start: string, end: string) => {
    if (start && end) {
        return (
            target >= new Date(start) &&
            target <= new Date(end)
        );
    }

    if (!start && !end) {
        return true;
    }

    if (start) {
        return target.getTime() === new Date(start).getTime();
    } else {
        return target.getTime() === new Date(end).getTime()
    }
}

export { getTableDate, isDateInRange }