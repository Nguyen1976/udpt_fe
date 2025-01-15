import { faFolder } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function Menu() {
    return (
        <div className="mt-12 max-w-[280px] mx-auto bg-slate-200 p-2 rounded-md">
            <h1 className="text-2xl font-bold ml-2 border-b-[1px] border-slate-500 pb-2">Folder</h1>
            <ul>
                <li>
                    <ul className="flex flex-col gap-2">
                        <li>
                            <details className="group">
                                <summary className="flex items-center justify-between gap-2 p-2 font-medium marker:content-none hover:cursor-pointer">
                                    <span className="flex gap-2 items-center">
                                        <FontAwesomeIcon icon={faFolder} />
                                        <span>Recent Documents</span>
                                    </span>
                                    <svg
                                        className="w-5 h-5 text-gray-500 transition group-open:rotate-90"
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="16"
                                        height="16"
                                        fill="currentColor"
                                        viewBox="0 0 16 16"
                                    >
                                        <path
                                            fill-rule="evenodd"
                                            d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"
                                        ></path>
                                    </svg>
                                </summary>

                                <article className="px-4 pb-4">
                                    <ul className="flex flex-col gap-2 pl-2">
                                        <li>
                                            <p>Việc cần làm</p>
                                        </li>
                                        <li>
                                            <p>Note</p>
                                        </li>
                                        <li>
                                            <p>Note</p>
                                        </li>
                                    </ul>
                                </article>
                            </details>
                        </li>
                    </ul>
                </li>
                <li>
                    <ul className="flex flex-col gap-2">
                        <li>
                            <details className="group">
                                <summary className="flex items-center justify-between gap-2 p-2 font-medium marker:content-none hover:cursor-pointer">
                                    <span className="flex gap-2 items-center">
                                        <FontAwesomeIcon icon={faFolder} />
                                        <span>Recent Documents</span>
                                    </span>
                                    <svg
                                        className="w-5 h-5 text-gray-500 transition group-open:rotate-90"
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="16"
                                        height="16"
                                        fill="currentColor"
                                        viewBox="0 0 16 16"
                                    >
                                        <path
                                            fill-rule="evenodd"
                                            d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"
                                        ></path>
                                    </svg>
                                </summary>

                                <article className="px-4 pb-4">
                                    <ul className="flex flex-col gap-2 pl-2">
                                        <li>
                                            <p>Việc cần làm</p>
                                        </li>
                                        <li>
                                            <p>Note</p>
                                        </li>
                                        <li>
                                            <p>Note</p>
                                        </li>
                                    </ul>
                                </article>
                            </details>
                        </li>
                    </ul>
                </li>
            </ul>
        </div>
    );
}
