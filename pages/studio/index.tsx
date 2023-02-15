import { _cs } from '@togglecorp/fujs';
import SideNavbar from 'components/PageWithSideBar/SideNav';
import Image from 'next/image';
import Link from 'next/link';

import styles from './styles.module.css';

function Studio() {
    return (
        <div className={_cs(
            styles.studio,
        )}
        >
            <div className={styles.bgWrap}>
                <SideNavbar
                    transparentMode
                />
                <div className={styles.leftBackground}>
                    <Image
                        alt="Left Image"
                        src="about_left.png"
                        placeholder="blur"
                        quality={100}
                        width={1104}
                        height={920}
                        sizes="100vw"
                        style={{
                            objectFit: 'cover',
                        }}
                    />
                </div>
                <div>
                    <Image
                        alt="Right Image"
                        src="about_right.png"
                        placeholder="blur"
                        quality={100}
                        width={736}
                        height={900}
                        sizes="100vw"
                        style={{
                            objectFit: 'cover',
                        }}
                    />
                </div>
                <div className={styles.studioContent}>
                    <Image
                        src="logo-dark.png"
                        alt="Gaatha"
                        width={145}
                        height={100}
                    />
                    <div className={styles.studioDescription}>
                        Based in Kathmandu, Gaatha (Nepali: गाथा), translating to stories, started
                        with a young group of collaborative professionals aligned together
                        in creating a studio where ideas are valued to reinforce better solutions
                        in architectural practice. Our studio incorporates a
                        team constantly striving to enhance the built environment with the
                        same care and detail in all works of
                        architecture, planning, landscape, art, graphics and research. Exploring,
                        creating and documenting stories with a team from diverse disciplines across
                        the globe, our practice has remained true to its core values ever since.
                    </div>
                    <div className={styles.studioRoutes}>
                        <Link
                            href="/about"
                        >
                            studio
                        </Link>
                        <Link
                            href="/design"
                        >
                            design
                        </Link>
                        <Link
                            href="/collaboration"
                        >
                            collaboration
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Studio;
