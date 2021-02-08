function timeout(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

export async function addVoteFake(vote) {
    await timeout(1000);
    return vote;
}

export async function getVotesFake() {
    await timeout(1000);
    let response = [
        {
            id: '1',
            title: 'public vote 42564',
            createdOn: '12.12.2020',
            description: 'This vote concerns multiple important areas',
            questions: [
                {
                    question: 'Is peanut butter better than jam?',
                    answerTrue: 'yes',
                    answerFalse: 'no',
                }
            ],
            status: 'pending',
        },
        {
            id: '2',
            title: 'electoral vote 1',
            createdOn: '21.05.2020',
            description: 'this is very important as it determines the next president',
            questions: [
                {
                    question: 'Whow should win the election?',
                    answerTrue: 'Trump',
                    answerFalse: 'Biden',
                }
            ],
            status: 'pending',
        }
    ];
    return response;
}