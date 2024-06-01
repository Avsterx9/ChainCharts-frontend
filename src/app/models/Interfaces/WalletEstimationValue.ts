export interface WalletEstimationValue{
    totalEstimation: number;
    tokenValues: TokenValue[];
}

export interface TokenValue{
    name: string;
    value: number;
}