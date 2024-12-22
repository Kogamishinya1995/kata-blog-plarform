import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { ErrorWithMessage } from '../types';

export function isFetchBaseQueryError(error: unknown): error is FetchBaseQueryError { 
    return typeof error === 'object' && error !== null && 'status' in error; 
} 

export function isErrorWithMessage(error: unknown): error is ErrorWithMessage { 
    return ( 
        typeof error === 'object' && 
        error !== null && 
        'message' in error && 
        typeof (error as ErrorWithMessage).message === 'string' 
    ); 
}