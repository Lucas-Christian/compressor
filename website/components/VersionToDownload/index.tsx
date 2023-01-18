import { ArrowDownTrayIcon, LockClosedIcon } from "@heroicons/react/24/outline";
import { Text } from "../Text";
import Link from "next/link";

type VersionToDownloadProps = {
  version: string;
  version_status: string;
  version_download: boolean;
}

export function VersionToDownload({version, version_status, version_download}: VersionToDownloadProps) {
  return (
    <div className="w-full h-full flex justify-between items-center">
      <Text size="md" bold>{version}</Text>
      <Text size="md" bold>{version_status}</Text>
      {
        version_download ? 
          <Link title={`Download ${version}`} href={`/download/${version}`}>
            <ArrowDownTrayIcon className="w-6 h-6 stroke-white" />
          </Link>
        :
          <LockClosedIcon className="w-6 h-6 stroke-gray-100 cursor-no-drop" />
      }
    </div>
  );
}