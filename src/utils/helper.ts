import { GetMyBallot } from "./RESTApi"




export const CheckBallot = () => {
    const myBallotList = GetMyBallot().then(r => r).then(rr => console.log(rr)).catch(e => console.log(e));
    console.log(myBallotList)
}