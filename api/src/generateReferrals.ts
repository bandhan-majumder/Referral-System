import crypto from "crypto";
// implementation of 6 digits random referral code generator
export function generateRandomReferrals(username: string){
        // first 3 character form username
        // next 2 character from referralcode module
        // 1 digit randomly generated
        const firstPart = username[0] + username[1] + username [2]
        const secondPart = () => {
            return crypto.randomBytes(1)
              .toString('hex')
              .toUpperCase()
              .slice(0, 2);
        };
        const firstAndSecondPart = firstPart.toUpperCase() + secondPart()
        const thirdPart: number = Math.floor(Math.random()*10)
        const referralCode = firstAndSecondPart+thirdPart
        return referralCode;
}