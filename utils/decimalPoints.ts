function decimalPoints(number:number,dp:number) {
    return ( Math.round(number * Math.pow(10, dp))/Math.pow(10, dp) );
}

export default decimalPoints;