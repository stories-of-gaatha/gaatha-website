import { _cs } from '@togglecorp/fujs';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';

import styles from './styles.module.css';

interface Props {
    className?: string;
    hideGaathaLogo?: boolean;
    lightMode?: boolean;
    transparentMode?: boolean;
}

function SideNavbar(props: Props) {
    const {
        className,
        lightMode,
        hideGaathaLogo = false,
        transparentMode = false,
    } = props;

    const router = useRouter();
    const currentRoute = router.pathname;

    return (
        <nav
            className={_cs(
                styles.sideNavbar,
                className,
                lightMode && styles.light,
                hideGaathaLogo && styles.noLogo,
                transparentMode && styles.transparentMode,
            )}
        >
            {!hideGaathaLogo && (
                <Link
                    href="/"
                >
                    <div>
                        {lightMode
                            ? (
                                <Image
                                    src="/logo-dark.png"
                                    alt="Gaatha"
                                    width={150}
                                    height={110}
                                />
                            ) : (
                                <Image
                                    src="/logo-light.png"
                                    alt="Gaatha"
                                    width={150}
                                    height={110}
                                />
                            )}
                    </div>
                </Link>
            )}
            <div className={styles.routes}>
                <Link
                    href="/works"
                    className={_cs(currentRoute === '/works' && styles.active)}
                >
                    Works
                </Link>
                <Link
                    href="/studio"
                    className={_cs(currentRoute === '/studio' && styles.active)}
                >
                    Studio
                </Link>
                <Link
                    href="/contact"
                    className={_cs(currentRoute === '/contact' && styles.active)}
                >
                    Contact
                </Link>
            </div>
        </nav>
    );
}
export default SideNavbar;
