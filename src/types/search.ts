// google search api types
export interface GoogleRes {
    kind: string;
    url: GoogleUrl;
    items: GoogleItem[];
    queries: GoogleQueries;
    context: GoggleContext;
    searchInformation: GoogleSearchInformation;
}

export interface GoogleUrl {
    type: string;
    template: string;
}

export interface GoogleQueries {
    request: GoogleRequest[];
    nextPage: GoggleNextPage[];
}

export interface GoogleRequest {
    title: string;
    totalResults: string;
    searchTerms: string;
    count: number;
    startIndex: number;
    inputEncoding: string;
    outputEncoding: string;
    safe: string;
    cx: string;
    searchType: string;
}

export interface GoggleNextPage {
    title: string;
    totalResults: string;
    searchTerms: string;
    count: number;
    startIndex: number;
    inputEncoding: string;
    outputEncoding: string;
    safe: string;
    cx: string;
    searchType: string;
}

export interface GoggleContext {
    title: string;
}

export interface GoogleSearchInformation {
    searchTime: number;
    formattedSearchTime: string;
    totalResults: string;
    formattedTotalResults: string;
}

export interface GoogleItem {
    kind: string;
    title: string;
    htmlTitle: string;
    link: string;
    displayLink: string;
    snippet: string;
    htmlSnippet: string;
    mime: string;
    fileFormat: string;
    image: GoogleImage;
}

export interface GoogleImage {
    contextLink: string;
    height: number;
    width: number;
    byteSize: number;
    thumbnailLink: string;
    thumbnailHeight: number;
    thumbnailWidth: number;
}
