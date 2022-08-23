import React, { useEffect, ReactNode } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { Popover, Typography } from "@mui/material";

// import { Container } from './styles';

interface Props {
  children?: ReactNode;
}

const sidebar: React.FC<Props> = ({ children }) => {
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
    null
  );

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  const router = useRouter();

  useEffect(() => {
    console.log(router.pathname);
  }, []);

  return (
    <>
      <div>
        <div className="flex h-screen bg-gray-100 dark:bg-gray-900 overflow-hidden">
          <aside className="z-20 hidden w-64 overflow-y-auto bg-white dark:bg-gray-800 md:block flex-shrink-0">
            <div className="text-gray-500 dark:text-gray-400">
              <span className="ml-6 text-lg font-bold text-gray-800 dark:text-gray-200 cursor-pointer">
                <svg
                  width="200"
                  viewBox="0 0 788 196"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <rect fill="white" />
                  <circle cx="78" cy="60" r="33" fill="#C748DE" />
                  <circle cx="161" cy="60" r="33" fill="#95A0AA" />
                  <circle cx="244" cy="60" r="33" fill="#E599A6" />
                  <path
                    d="M335.28 55.848H370.8V61.896H335.28V55.848ZM336.048 86.856H376.464V93H328.944V25.8H375.024V31.944H336.048V86.856ZM382.411 93L413.131 25.8H420.139L450.859 93H443.371L415.147 29.928H418.027L389.803 93H382.411ZM394.507 75.048L396.619 69.288H435.691L437.803 75.048H394.507ZM480.503 93.576C475.511 93.576 470.711 92.776 466.103 91.176C461.559 89.512 458.039 87.4 455.543 84.84L458.327 79.368C460.695 81.672 463.863 83.624 467.831 85.224C471.863 86.76 476.087 87.528 480.503 87.528C484.727 87.528 488.151 87.016 490.775 85.992C493.463 84.904 495.415 83.464 496.631 81.672C497.911 79.88 498.551 77.896 498.551 75.72C498.551 73.096 497.783 70.984 496.247 69.384C494.775 67.784 492.823 66.536 490.391 65.64C487.959 64.68 485.271 63.848 482.327 63.144C479.383 62.44 476.439 61.704 473.495 60.936C470.551 60.104 467.831 59.016 465.335 57.672C462.903 56.328 460.919 54.568 459.383 52.392C457.911 50.152 457.175 47.24 457.175 43.656C457.175 40.328 458.039 37.288 459.767 34.536C461.559 31.72 464.279 29.48 467.927 27.816C471.575 26.088 476.247 25.224 481.943 25.224C485.719 25.224 489.463 25.768 493.175 26.856C496.887 27.88 500.087 29.32 502.775 31.176L500.375 36.84C497.495 34.92 494.423 33.512 491.159 32.616C487.959 31.72 484.855 31.272 481.847 31.272C477.815 31.272 474.487 31.816 471.863 32.904C469.239 33.992 467.287 35.464 466.007 37.32C464.791 39.112 464.183 41.16 464.183 43.464C464.183 46.088 464.919 48.2 466.391 49.8C467.927 51.4 469.911 52.648 472.343 53.544C474.839 54.44 477.559 55.24 480.503 55.944C483.447 56.648 486.359 57.416 489.239 58.248C492.183 59.08 494.871 60.168 497.303 61.512C499.799 62.792 501.783 64.52 503.255 66.696C504.791 68.872 505.559 71.72 505.559 75.24C505.559 78.504 504.663 81.544 502.871 84.36C501.079 87.112 498.327 89.352 494.615 91.08C490.967 92.744 486.263 93.576 480.503 93.576ZM535.664 93V68.04L537.296 72.456L508.784 25.8H516.368L541.424 66.792H537.392L562.448 25.8H569.552L541.04 72.456L542.672 68.04V93H535.664Z"
                    fill="#2B2D2F"
                  />
                </svg>
              </span>
              <ul className="mt-6">
                <li className="relative px-6 py-3">
                  {router.pathname === "/dashboard" ? (
                    <span
                      className="absolute inset-y-0 left-0 w-1 bg-purple-600 rounded-tr-lg rounded-br-lg"
                      aria-hidden="true"
                    ></span>
                  ) : (
                    <></>
                  )}
                  <Link href="/dashboard">
                    <a
                      className={
                        (router.pathname === "/dashboard"
                          ? "text-purple-600 "
                          : "text-gray-600 hover:text-gray-800 ") +
                        "inline-flex items-center w-full text-sm font-semibold transition-colors duration-150 dark:hover:text-gray-200 dark:text-gray-100"
                      }
                    >
                      <svg
                        className="w-5 h-5"
                        aria-hidden="true"
                        fill="none"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path>
                      </svg>
                      <span className="ml-4">Dashboard</span>
                    </a>
                  </Link>
                </li>
              </ul>
              <ul>
                <li className="relative px-6 py-3">
                  {router.pathname === "/trendlines" ? (
                    <span
                      className="absolute inset-y-0 left-0 w-1 bg-purple-600 rounded-tr-lg rounded-br-lg"
                      aria-hidden="true"
                    ></span>
                  ) : (
                    <></>
                  )}
                  <Link href="/trendlines">
                    <a
                      className={
                        (router.pathname === "/trendlines"
                          ? "text-purple-600 "
                          : "text-gray-600 hover:text-gray-800 ") +
                        "inline-flex items-center w-full text-sm font-semibold transition-colors duration-150 dark:hover:text-gray-200 dark:text-gray-100"
                      }
                    >
                      <svg xmlns="http://www.w4.org/2000/svg" enable-background="new 0 0 24 24" height="24px" viewBox="0 0 24 24" width="24px" fill="rgb(130,130,130)"><g><rect fill="none" height="24" width="24" x="0" /></g><g><g><path d="M23,8c0,1.1-0.9,2-2,2c-0.18,0-0.35-0.02-0.51-0.07l-3.56,3.55C16.98,13.64,17,13.82,17,14c0,1.1-0.9,2-2,2s-2-0.9-2-2 c0-0.18,0.02-0.36,0.07-0.52l-2.55-2.55C10.36,10.98,10.18,11,10,11c-0.18,0-0.36-0.02-0.52-0.07l-4.55,4.56 C4.98,15.65,5,15.82,5,16c0,1.1-0.9,2-2,2s-2-0.9-2-2s0.9-2,2-2c0.18,0,0.35,0.02,0.51,0.07l4.56-4.55C8.02,9.36,8,9.18,8,9 c0-1.1,0.9-2,2-2s2,0.9,2,2c0,0.18-0.02,0.36-0.07,0.52l2.55,2.55C14.64,12.02,14.82,12,15,12c0.18,0,0.36,0.02,0.52,0.07 l3.55-3.56C19.02,8.35,19,8.18,19,8c0-1.1,0.9-2,2-2S23,6.9,23,8z" /></g></g></svg>
                      <span className="ml-4">Trendlines</span>
                    </a>
                  </Link>
                </li>
              </ul>
              <ul>
                <li className="relative px-6 py-3">
                  {router.pathname === "/test" ? (
                    <span
                      className="absolute inset-y-0 left-0 w-1 bg-purple-600 rounded-tr-lg rounded-br-lg"
                      aria-hidden="true"
                    ></span>
                  ) : (
                    <></>
                  )}
                  <Link href="/test">
                    <a
                      className={
                        (router.pathname === "/test"
                          ? "text-purple-600 "
                          : "text-gray-600 hover:text-gray-800 ") +
                        "inline-flex items-center w-full text-sm font-semibold transition-colors duration-150 dark:hover:text-gray-200 dark:text-gray-100"
                      }
                    >
                      <svg
                        className="w-5 h-5"
                        aria-hidden="true"
                        fill="none"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"></path>
                      </svg>
                      <span className="ml-4">Test</span>
                    </a>
                  </Link>
                </li>
              </ul>
            </div>
          </aside>
          <div className="flex flex-col flex-1 w-full">
            <header className="z-10 py-4 bg-white shadow-sm dark:bg-gray-800">
              <div className="container flex items-center justify-between h-full px-6 mx-auto text-purple-600 dark:text-purple-300">
                <button
                  className="p-1 mr-5 -ml-1 rounded-md md:hidden focus:outline-none focus:shadow-outline-purple"
                  aria-label="Menu"
                >
                  <svg
                    className="w-6 h-6"
                    aria-hidden="true"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                      clip-rule="evenodd"
                    ></path>
                  </svg>
                </button>

                <div className="flex justify-center flex-1 lg:mr-32">
                  <div className="relative w-full max-w-xl mr-6 focus-within:text-purple-500">
                    <div className="absolute inset-y-0 flex items-center pl-2">
                      <svg
                        className="w-4 h-4"
                        aria-hidden="true"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                          clip-rule="evenodd"
                        ></path>
                      </svg>
                    </div>
                    <input
                      className="w-full pl-8 pr-2 py-2 text-sm text-gray-700 placeholder-gray-600 bg-gray-100 outline-none rounded-md dark:placeholder-gray-500 dark:focus:shadow-outline-gray dark:focus:placeholder-gray-600 dark:bg-gray-700 dark:text-gray-200 focus:placeholder-gray-500 form-input"
                      type="text"
                      placeholder="Search for projects"
                      aria-label="Search"
                    />
                  </div>
                </div>
                <ul className="flex items-center flex-shrink-0 space-x-6">
                  <li className="relative">
                    <button
                      aria-describedby={id}
                      onClick={handleClick}
                      className="align-middle rounded-full focus:shadow-outline-purple focus:outline-none"
                      aria-label="Account"
                      aria-haspopup="true"
                    >
                      <img
                        className="object-cover w-10 h-10 rounded-full"
                        src="https://images.unsplash.com/photo-1502378735452-bc7d86632805?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=200&fit=max&s=aa3a807e1bbdfd4364d1f449eaa96d82"
                        alt=""
                        aria-hidden="true"
                      />
                    </button>

                    <Popover
                      id={id}
                      open={open}
                      anchorEl={anchorEl}
                      onClose={handleClose}
                      anchorOrigin={{
                        vertical: "bottom",
                        horizontal: "left",
                      }}
                    >
                      <div>
                        <ul
                          className="w-56 p-2 space-y-2 text-gray-600 bg-white border border-gray-100 rounded-md shadow-md dark:border-gray-700 dark:text-gray-300 dark:bg-gray-700"
                          aria-label="submenu"
                        >
                          <li className="flex">
                            <a
                              className="inline-flex items-center w-full px-2 py-1 text-sm font-semibold transition-colors duration-150 rounded-md hover:bg-gray-100 hover:text-gray-800 dark:hover:bg-gray-800 dark:hover:text-gray-200"
                              href="#"
                            >
                              <svg
                                className="w-4 h-4 mr-3"
                                aria-hidden="true"
                                fill="none"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                              >
                                <path d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                              </svg>
                              <span>Profile</span>
                            </a>
                          </li>
                          <li className="flex">
                            <a
                              className="inline-flex items-center w-full px-2 py-1 text-sm font-semibold transition-colors duration-150 rounded-md hover:bg-gray-100 hover:text-gray-800 dark:hover:bg-gray-800 dark:hover:text-gray-200"
                              href="#"
                            >
                              <svg
                                className="w-4 h-4 mr-3"
                                aria-hidden="true"
                                fill="none"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                              >
                                <path d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path>
                                <path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                              </svg>
                              <span>Settings</span>
                            </a>
                          </li>
                          <li className="flex">
                            <a
                              className="inline-flex items-center w-full px-2 py-1 text-sm font-semibold transition-colors duration-150 rounded-md hover:bg-gray-100 hover:text-gray-800 dark:hover:bg-gray-800 dark:hover:text-gray-200"
                              href="#"
                            >
                              <svg
                                className="w-4 h-4 mr-3"
                                aria-hidden="true"
                                fill="none"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                              >
                                <path d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"></path>
                              </svg>
                              <span>Log out</span>
                            </a>
                          </li>
                        </ul>
                      </div>
                    </Popover>
                  </li>
                </ul>
              </div>
            </header>
            {children}
          </div>
        </div>
      </div>
    </>
  );
};

export default sidebar;
