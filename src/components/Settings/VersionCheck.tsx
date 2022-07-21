import { ReactText, useEffect, useRef, useState } from "react";
import { toast } from 'material-react-toastify';
import DownloadIcon from '@mui/icons-material/Download';
import packageJson from "../../../package.json";
import { Trans } from "react-i18next";
import { Button } from "@mui/material";
import { Progress } from "electron-dl";

const GITHUB_LATEST_RELEASE = 'https://api.github.com/repos/zeddicus-pl/d2rHolyGrail/releases/latest';

type GitHubRelease = {
    name: string,
    assets: Array<{
        browser_download_url: string,
    }>,
}

const isNewVersionAvailable = (currentVersion:string, candidateVersion: string): boolean => {
    if (currentVersion === candidateVersion) return false;
    const candidate = candidateVersion.replace('v', '').split('.');
    const current = currentVersion.replace('v', '').split('.');
    for (let i = 0; i < current.length; i++) {
        const a = current[i] ? parseInt(current[i]) : 0;
        const b = candidate[i] ? parseInt(candidate[i]) : 0;
        if (a > b) return false;
        if (a < b) return true;
    }
    return false;
}

const VersionCheck = () => {
    const toastId = useRef<ReactText|null>(null);
    const [ newVersionUrl, setNewVersionUrl ] = useState('');
    const [ isDownloading, setIsDownloading ] = useState(false);

    const NewVersionButton = () => {
        return <div style={{ paddingRight: 15 }}>
            <Button
                onClick={() => {
                    window.Main.downloadNewVersion(newVersionUrl);
                    setIsDownloading(true);
                }}
                variant="text"
                sx={{
                    textTransform: 'none',
                    fontWeight: 'normal',
                    color: '#ddd',
                }}
            >
                <DownloadIcon/>
                <Trans>New version is available, click here to download.</Trans>
            </Button>
        </div>
    }

    const toastNewVersionButton = (): ReactText => {
        if (toastId.current) {
            toast.update(toastId.current, {
                render: <NewVersionButton />,
                hideProgressBar: true,
                progress: 0,
            });
            return '';
        } else {
            return toast(<NewVersionButton />, {
                position: "bottom-center",
                autoClose: false,
                hideProgressBar: true,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: false,
                type: "dark"
            });
        }
    }

    useEffect(() => {
        fetch(GITHUB_LATEST_RELEASE)
            .then((response) => response.json())
            .then((release: GitHubRelease) => {
                if (isNewVersionAvailable(packageJson.version, release.name)) {
                    const isWin = window.Main.isWindows();
                    const setupAsset = release.assets.find(asset => asset.browser_download_url.includes(isWin ? 'win' : 'darwin'));
                    if (setupAsset) {
                        setNewVersionUrl(setupAsset.browser_download_url);
                    }
                }
            })
            .catch((e) => console.log('Could not check for new version'));
        
        window.Main.on('downloadProgress', (progress: Progress) => {
            if(toastId.current !== null) {
                toast.update(toastId.current, {
                    hideProgressBar: false,
                    progress: progress.percent,
                    render: <Button onClick={() => {
                        window.Main.cancelDownload();
                        setIsDownloading(false);
                    }}>
                        <Trans>Downloading installer... Click here to cancel</Trans>
                    </Button>,
                });
            }
        })
    }, []);

    useEffect(() => {
        if (newVersionUrl !== '' && !isDownloading) {
            if (!toastId.current) {
                toastId.current = toastNewVersionButton();
            } else {
                toastNewVersionButton();
            }
        }
    }, [ isDownloading, newVersionUrl ]);

    return null;
}

export default VersionCheck;