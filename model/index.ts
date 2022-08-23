export interface IAlerts {
    id:           number;
    email:        string;
    price:        number;
    direction:    string;
    message:      string;
    phone_number: string;
    symbol:       string;
    active:       boolean;
}

export interface ISymbols {
    id:          number;
    symbol:      string;
    price:       number;
    digits:      number;
    img_first:   string;
    img_second:  string;
    description: string;
}

export interface ITrendLines {
    id:           number;
    trendline:    string;
    price:        number;
    hour:         Date;
    lots:         number;
    take_profit:  number;
    symbol:       string;
    direction:    string;
    phone_number: string;
    active:       number;
    digits:       number;
}
