import React from 'react';
import { isDefined, _cs } from '@togglecorp/fujs';
import { GetStaticProps, GetStaticPaths } from 'next';
import Image from 'next/legacy/image';
import { gql } from 'graphql-request';

import { gaathaRequest } from 'utils/common';
import {
    WorkItemQuery,
    WorkMiniListQuery,
} from 'generated/types';

import ProjectTitle from 'components/ProjectTitle';
import GaathaLogo from 'components/GaathaLogo';
import WorkDetail from 'components/workDetail';

import styles from './styles.module.css';

type WorkItemType = NonNullable<WorkItemQuery['work']>;

interface Props {
    work: WorkItemType;
}

function WorkItem(props: Props) {
    const {
        work,
    } = props;

    /*
    const divRef = useRef<HTMLDivElement>(null);

    const handleClick = useCallback(() => {
        divRef.current?.scrollIntoView({
            behavior: 'smooth',
        });
    }, []);
     */

    return (
        <div className={styles.page}>
            <div className={styles.imageWrapper}>
                {isDefined(work.coverImage) && isDefined(work.coverImage.url) && (
                    <Image
                        className={styles.image}
                        src={work.coverImage.url}
                        alt="cover image"
                        quality={90}
                        placeholder="blur"
                        layout="fill"
                    />
                )}
            </div>
            <div className={styles.hero}>
                <div className={styles.header}>
                    <div className={styles.top}>
                        <GaathaLogo
                            className={styles.logo}
                            variant="small"
                        />
                        <ProjectTitle
                            className={_cs(
                                styles.title,
                                work.isCoverImageDark && styles.darkCoverImage,
                            )}
                            title={work.title}
                            subtitle={work.subTitle}
                            size="large"
                        />
                    </div>
                </div>
            </div>
            <WorkDetail
                // elementRef={divRef}
                className={styles.detail}
                work={work}
            />
        </div>
    );
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
    const work = gql`
        query WorkItem (
            $id: ID!,
        ) {
            work(pk: $id) {
                id
                title
                subTitle
                description
                area
                duration
                location
                status
                isCoverImageDark
                artWork {
                    name
                    url
                }
                coverImage {
                    name
                    url
                }
                images {
                    id
                    image {
                        name
                        url
                        width
                        height
                    }
                }
            }
        }
    `;

    const value = await gaathaRequest(work, { id: params?.id });
    const props = { work: value.work };

    return { props };
};

type WorkMiniItem = NonNullable<WorkMiniListQuery['works']>[number];

export const getStaticPaths: GetStaticPaths = async () => {
    const workMiniList = gql`
        query WorkMiniList {
            works {
                id
                title
                subTitle
            }
        }
    `;

    const value = await gaathaRequest(workMiniList);
    const pathsWithParams = value.works.map((project: WorkMiniItem) => ({
        params: { id: project.id },
    }));

    return {
        paths: pathsWithParams,
        fallback: 'blocking',
    };
};

export default WorkItem;
