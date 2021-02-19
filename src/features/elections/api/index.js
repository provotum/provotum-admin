const axios = require('axios').default;

export const createVote = async (vaUrl) => {
    console.log('creating vote');
    try {
        let response = await axios.post(`http://${vaUrl}/votes`,
            {
                "title": "Claudios super cool vote",
                "questions": [
                    "Question 1'",
                    "Question 2"
                ]
            }
        );
        console.log('success', response);
        return response.data;
    } catch (e) {
        console.log('error')
        console.log(e);
    }
}

export const getVotes = async (vaUrl) => {
    console.log('fetching votes');
    try {
        let response = await axios.get(`http://${vaUrl}/votes`);
        console.log(response);
        return response.data;
    } catch (e) {
        console.log(e);
        return []
    }
}

export const combineDistributedKeys = async (vaUrl, electionId) => {
    console.log('combinging dkg keys');
    try {
        let response = await axios.post(`http://${vaUrl}/dkg`, { electionId: electionId });
        console.log(response);
        return response.data;
    } catch (e) {
        console.log(e);
        return []
    }
}