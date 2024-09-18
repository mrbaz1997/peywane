exports.is24HoursPassed = (creationDate) => {
    const now = new Date();
    const hoursPassed = (now - new Date(creationDate)) / (1000 * 60 * 60);
    return hoursPassed >= 24;
};
