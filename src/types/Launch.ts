export type Launch = {
    id: string;
    name: string;
    links: {
        patch: {
            small: string;
            large: string;
        };
    };
    flight_number: number;
    details: string;
    date_utc: string;
};
