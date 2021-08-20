
const axios = require('axios').default;

export const checkVotingAuthorityUp = async (vaUrl) => {
    let response = await axios.get(`${vaUrl}/health`);
    return response.data;
}

export const checkChainUp = async (vaUrl) => {
    try {
        let response = await axios.get(`${vaUrl}/votes`);
        console.log('chain up', response.data);
        return response.data ? true : false;
    } catch (e) {
        console.log(e);
        return false;
    }

}

export const fetchPeers = async (vaUrl) => {
    let resp
}

export const getRegisteredSealers = async (vaUrl) => {
    let response = await axios.get(`${vaUrl}/bootstrap/sealers`);
    return response.data;

}

export const checkValidatorKeysForSealer = async (vaUrl, sealer) => {
    console.log(sealer.grandpaAddress, sealer.auraAddress);
    let response = await axios.get(`${vaUrl}/bootstrap/validators`,
        {
            params: {
                auraAddress: sealer.auraAddress,
                grandpaAddress: sealer.grandpaAddress
            }

        });
    console.log(response);
    return {
        sealerName: sealer.name,
        response: response.data,
    }
}

export const createChainSpec = async (vaUrl) => {
    console.log('sending out spec')
    try {
        let response = await axios.post(`${vaUrl}/bootstrap/chain-spec`);
        console.log(response);
        return response.data;
    } catch (e) {
        console.log(e)
    }


}

export const fetchChainSpec = async (vaUrl) => {
    let response = await axios.get(`${vaUrl}/bootstrap/chain-spec`);
    return response.data;

}

export const fetchPeer = async (vaUrl) => {
    try {
        let response = await axios.get(`${vaUrl}/bootstrap/peer`);
        console.log('peer ', response.data);
        return response.data;
    } catch (e) {
        console.log(e);
        return {};
    }


}

export const startChainNode = async (vaUrl, restart) => {
    console.log('starting chain node')
    try {
        let response = await axios.post(`${vaUrl}/bootstrap/chain?restart=${restart}`);
        console.log(response.data);
        return response.data;
    } catch (e) {
        console.log(e)
        return false;
    }
}

export const stopChainNode = async (vaUrl) => {
    console.log('stopping chain node')
    try {
        let response = await axios.post(`${vaUrl}/bootstrap/chain/stop`);
        console.log(response.data);
        return response.data;
    } catch (e) {
        console.log(e)
    }
}
