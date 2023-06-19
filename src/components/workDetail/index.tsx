import { useState } from 'react';
import { isDefined, _cs } from '@togglecorp/fujs';
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/mousewheel';
import {
    EffectFade,
    Pagination,
    Mousewheel,
    Autoplay,
} from 'swiper';

import SideNavbar from 'components/PageWithSideBar/SideNav';
import TextOutput from 'components/TextOutput';
import GaathaLogo from 'components/GaathaLogo';
import HTMLOutput from 'components/HTMLOutput';
import Button from 'components/Button';
import ProjectTitle from 'components/ProjectTitle';
import { WorkItemQuery } from 'generated/types';

import styles from './styles.module.css';

type WorkItemType = NonNullable<WorkItemQuery['work']>;
interface Props {
    work: WorkItemType;
}

function WorkDetail(props: Props) {
    const {
        work,
    } = props;

    const galleryImages = work.images;
    const [
        activeTab,
        setActiveTab,
    ] = useState<'text' | 'image'>('image');

    const textShown = activeTab === 'text';
    const imagesShown = activeTab === 'image';

    return (
        <div className={styles.page}>
            <SideNavbar
                className={styles.navbar}
                lightMode
                hideGaathaLogo
            />
            <ProjectTitle
                className={styles.workTitle}
                title={work.title}
                subtitle={work.subTitle}
                size="medium"
            />
            <div className={styles.topBar}>
                <ProjectTitle
                    title={work.title}
                    subtitle={work.subTitle}
                    size="medium"
                />
                <GaathaLogo
                    className={styles.logo}
                    variant="small"
                    lightMode
                />
            </div>
            <div className={styles.responsiveArtwork}>
                {isDefined(work.artWork) && isDefined(work.artWork.url) && (
                    <Image
                        className={styles.artwork}
                        src={work.artWork.url}
                        alt="artwork"
                        fill
                    />
                )}
            </div>
            <div className={styles.content}>
                <div className={styles.tabs}>
                    <Button
                        name="text"
                        onClick={setActiveTab}
                        className={_cs(
                            styles.button,
                            activeTab === 'text' && styles.active,
                        )}
                    >
                        Text
                    </Button>
                    <Button
                        name="image"
                        onClick={setActiveTab}
                        className={_cs(
                            styles.button,
                            activeTab === 'image' && styles.active,
                        )}
                    >
                        Images
                    </Button>

                </div>
                <div className={styles.left}>
                    <div className={styles.artworkContainer}>
                        {isDefined(work.artWork) && isDefined(work.artWork.url) && (
                            <Image
                                className={styles.artwork}
                                src={work.artWork.url}
                                alt="artwork"
                                fill
                            />
                        )}
                    </div>
                    <div className={_cs(styles.description, textShown && styles.textShown)}>
                        <HTMLOutput
                            value={work.description}
                        />
                    </div>
                </div>
                <div className={styles.carouselWrapper}>
                    {(galleryImages.length > 0) && (
                        <Swiper
                            className={_cs(styles.carousel, imagesShown && styles.imagesShown)}
                            effect="fade"
                            modules={[EffectFade, Mousewheel, Pagination, Autoplay]}
                            pagination={{ clickable: true }}
                            direction="vertical"
                            autoplay={{ delay: 2500 }}
                            mousewheel
                            draggable
                        >
                            {galleryImages?.map((image) => (
                                isDefined(image.image) && isDefined(image.image.url) && (
                                    <SwiperSlide
                                        className={styles.imageWrapper}
                                    >
                                        <Image
                                            className={styles.image}
                                            src={image.image.url}
                                            alt="carousel image"
                                            fill
                                        />
                                    </SwiperSlide>
                                )
                            ))}
                        </Swiper>
                    )}
                    <div className={styles.rightPane}>
                        <GaathaLogo
                            variant="small"
                            className={styles.logo}
                            lightMode
                        />
                        <div className={styles.extraInfo}>
                            <TextOutput
                                className={styles.info}
                                label="Area"
                                value={work.area}
                                multiline
                            />
                            <TextOutput
                                className={styles.info}
                                label="Status"
                                value={work.status}
                                multiline
                            />
                            <TextOutput
                                className={styles.info}
                                label="Duration"
                                value={work.duration}
                                multiline
                            />
                            <TextOutput
                                className={styles.info}
                                label="Location"
                                value={work.location}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default WorkDetail;