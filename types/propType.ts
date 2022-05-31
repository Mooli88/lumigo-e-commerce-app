import { NextPage } from 'next';
import { ReactElement, ReactNode } from 'react';

export type ChildrenOnlyProps = {
    children?: ReactNode;
};

export type Props<T> = ChildrenOnlyProps & T;

export type NextPageWithLayout<T = undefined> = NextPage<T> & {
    getLayout?: (page: ReactElement) => ReactNode;
};
