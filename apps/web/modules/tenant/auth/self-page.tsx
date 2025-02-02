"use client";

import { Button, Loader, Logo, showToast } from "@buff/ui";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Webcam from "react-webcam";
// import Steps from "rc-steps";

import { ServerResponse } from "_types";
import "rc-steps/assets/index.css";
import { useCallback, useEffect, useRef, useState } from "react";
import { useUploadSelfie } from "./api/upload-selfie";

export const KycSelfPage = () => {
  const router = useRouter();
  const [imgSrc, setImgSrc] = useState("");

  const [permissionState, setPermissionState] =
    useState<PermissionState>("prompt");

  const videoConstraints = {
    width: 1280,
    height: 720,
    facingMode: "user",
  };

  const onSuccess = (response: ServerResponse<string>) => {
    if (response.data) {
      showToast("Profile image updated successfully", "success");
    }
  };

  const onError = (errorResponse: any) => {
    const serverError = JSON.parse(errorResponse.message);
    showToast(serverError.message, "error");
  };

  const webcamRef = useRef<Webcam>(null);
  const uploadProfilePhoto = useUploadSelfie({ onSuccess, onError });

  const capture = useCallback(() => {
    if (webcamRef.current) {
      const imageSrc = webcamRef.current.getScreenshot();
      if (imageSrc) {
        setImgSrc(imageSrc);
      }
    }
  }, [webcamRef]);

  const checkPermission = async (): Promise<void> => {
    try {
      if (!navigator.permissions || !navigator.permissions.query) {
        return;
      }

      const result = await navigator.permissions.query({
        name: "camera" as PermissionName,
      });

      console.log("result=>", result);
      setPermissionState(result.state as PermissionState);

      if (result.state === "denied") {
        showToast("Enable camera permission to continue.", "warning");
      }

      result.addEventListener("change", () => {
        setPermissionState(result.state as PermissionState);
      });
    } catch (err) {
      // Some browsers might not support permission query for camera
      console.log("Permission query not supported");
    }
  };

  const handleRedirect = () => {
    router.push("/auth/tenant");
  };

  const base64ToFile = (base64: string, filename: string): File => {
    const arr = base64.split(",");
    const mime = arr[0]?.match(/:(.*?);/)![1]; // Extract the MIME type from the base64 header
    const bstr = atob(arr[1] || ""); // Decode Base64 string
    let n = bstr.length;
    const u8arr = new Uint8Array(n);

    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }

    return new File([u8arr], filename, { type: mime });
  };

  const uploadHandler = () => {
    const userInfo = localStorage.getItem("tenant_user");
    const userData = userInfo && JSON.parse(userInfo);

    const name = userData.name as string;
    const nameArr = name.split(" ");
    const firstName = nameArr[0] + "photo";
    const userImage = base64ToFile(imgSrc, firstName);
    console.log("userImage", userImage);

    uploadProfilePhoto.mutate({ image: userImage });
  };

  useEffect(() => {
    checkPermission();
  }, []);

  return (
    <div className="h-screen w-screen relative">
      <div className="w-full h-full flex ">
        <div className="relative h-full hidden md:sticky  flex-col md:flex md:min-w-[47.7rem]  ">
          <Image
            alt="vms-auth-landing"
            src={"/images/bg.png"}
            priority
            fill
            sizes="(min-width: 808px) 50vw, 100vw"
            style={{
              objectFit: "cover", // cover, contain, none
            }}
          />
          <div className="z-50 ml-[3.2rem] mt-[11.24%]">
            <Link href="/auth/tenant">
              <Logo />
            </Link>
          </div>

          <figure className="z-50 overflow-hidden absolute left-0 bottom-0 w-full">
            <img src={"/images/kyc.png"} className="w-full object-contain" />
          </figure>
        </div>

        <div className="w-0 flex-1 flex flex-col  items-center text-brand justify-center">
          <div className="flex w-[43rem] flex-col items-center justify-center">
            <div className="w-full flex gap-[2.4rem] flex-col">
              <h2 className="leading-[3.6rem] font-bold text-[2.4rem] text-center mb-[1.3rem] text-white">
                Take your selfie for the <br />
                final verification.
              </h2>

              <div className="w-full block">
                <div className=" mb-[2.4rem] border border-1 border-dashed h-[443px] flex items-center justify-center flex-col">
                  {imgSrc ? (
                    <figure className="w-full h-full">
                      <img
                        src={imgSrc}
                        className="w-full h-full object-contain"
                      />
                    </figure>
                  ) : (
                    <>
                      {permissionState === "prompt" && (
                        <span>
                          <svg
                            width="121"
                            height="120"
                            viewBox="0 0 121 120"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M60.5 110C88.1142 110 110.5 87.6142 110.5 60C110.5 32.3858 88.1142 10 60.5 10C32.8858 10 10.5 32.3858 10.5 60C10.5 87.6142 32.8858 110 60.5 110Z"
                              stroke="#848484"
                              stroke-width="5"
                            />
                            <path
                              d="M38 85C49.6585 72.789 71.216 72.214 83 85M72.9755 47.5C72.9755 54.4035 67.371 60 60.4575 60C53.5445 60 47.9399 54.4035 47.9399 47.5C47.9399 40.5964 53.5445 35 60.4575 35C67.371 35 72.9755 40.5964 72.9755 47.5Z"
                              stroke="#848484"
                              stroke-width="5"
                              stroke-linecap="round"
                            />
                          </svg>
                        </span>
                      )}

                      <Webcam
                        audio={false}
                        height={443}
                        ref={webcamRef}
                        screenshotFormat="image/jpeg"
                        width={443}
                        videoConstraints={videoConstraints}
                      />
                    </>
                  )}
                </div>
                <div className="flex flex-col gap-3">
                  {imgSrc ? (
                    <>
                      <Button
                        variant="danger"
                        type="button"
                        onClick={uploadHandler}
                        className="w-full"
                        size="large"
                      >
                        Confirm
                      </Button>
                      <Button
                        variant="danger"
                        type="button"
                        onClick={() => setImgSrc("")}
                        size="large"
                        className="bg-transparent w-full text-[#848484] border-[#848484]"
                      >
                        Retake
                      </Button>
                    </>
                  ) : (
                    <Button
                      variant="danger"
                      type="button"
                      onClick={capture}
                      className="w-full"
                      size="large"
                    >
                      Tap to take selfie
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {uploadProfilePhoto.isPending && (
        <Loader
          loading={uploadProfilePhoto.isPending}
          Message={MessageDisplay}
        />
      )}
      {uploadProfilePhoto.isSuccess && (
        <Loader
          redirectUrl="/auth/tenant"
          loading={uploadProfilePhoto.isSuccess}
          Message={() => (
            <SuccessDisplay
              closeModal={() => {
                handleRedirect();
              }}
            />
          )}
        />
      )}
    </div>
  );
};

const SuccessDisplay = ({ closeModal }: { closeModal?: () => void }) => {
  const ref = useRef<HTMLDivElement>(null);
  const timerId = useRef<NodeJS.Timeout>();

  useEffect(() => {
    if (ref.current) {
      timerId.current = setTimeout(() => {
        if (ref.current) {
          if (closeModal) {
            closeModal();
          }
        }
      }, 3000);
    }

    () => {
      clearTimeout(timerId.current);
    };
  }, []);
  return (
    <div ref={ref}>
      <div className=" border rounded-[8px] border-[#848484] flex flex-col gap-2 items-center justify-center bg-brand-black w-[29.9rem] h-[16.6rem]">
        <svg
          width="43"
          height="42"
          viewBox="0 0 43 42"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M4 10.5L16.0978 17.3547C20.5578 19.8818 22.4422 19.8818 26.9022 17.3547L39 10.5"
            stroke="#FFBE0A"
            stroke-width="2.625"
            stroke-linejoin="round"
          />
          <path
            d="M4.0276 23.5823C4.142 28.9471 4.1992 31.6293 6.17868 33.6165C8.15814 35.6034 10.9131 35.6725 16.423 35.811C19.8188 35.8964 23.1812 35.8964 26.5771 35.811C32.087 35.6725 34.8418 35.6034 36.8214 33.6165C38.8008 31.6293 38.8581 28.9471 38.9723 23.5823C39.0093 21.8573 39.0093 20.1427 38.9723 18.4177C38.8581 13.053 38.8008 10.3707 36.8214 8.38366C34.8418 6.39665 32.087 6.32744 26.5771 6.189C23.1812 6.10367 19.8188 6.10367 16.4229 6.18898C10.9131 6.32741 8.15814 6.39662 6.17866 8.38364C4.19919 10.3706 4.14199 13.053 4.02758 18.4177C3.99079 20.1427 3.99081 21.8573 4.0276 23.5823Z"
            stroke="#FFBE0A"
            stroke-width="2.625"
            stroke-linejoin="round"
          />
        </svg>

        <p className="text-center text-white text-[1.6rem] leading-[2.4rem]">
          Photo uploaded successfully.
        </p>
      </div>
    </div>
  );
};

const MessageDisplay = () => {
  return (
    <div>
      <div className=" border rounded-[8px] border-[#848484] flex flex-col gap-2 items-center justify-center bg-brand-black w-[29.9rem] h-[16.6rem]">
        <svg
          width="43"
          height="42"
          viewBox="0 0 43 42"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M38.125 21C38.125 30.1817 30.6817 37.625 21.5 37.625C12.3183 37.625 4.875 30.1817 4.875 21C4.875 11.8183 12.3183 4.375 21.5 4.375C28.3173 4.375 34.1763 8.47836 36.7416 14.35M38.125 9.625L37.2937 15.1813L32 14"
            stroke="#FFBE0A"
            stroke-width="2.625"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M18 19.25V16.625C18 14.692 19.567 13.125 21.5 13.125C23.433 13.125 25 14.692 25 16.625V19.25M20.1875 28.875H22.8125C24.8649 28.875 25.8911 28.875 26.5979 28.3325C26.7799 28.1929 26.9428 28.0299 27.0825 27.8479C27.625 27.1411 27.625 26.1149 27.625 24.0625C27.625 22.0101 27.625 20.9839 27.0825 20.2771C26.9428 20.0951 26.7799 19.9322 26.5979 19.7925C25.8911 19.25 24.8649 19.25 22.8125 19.25H20.1875C18.1351 19.25 17.1089 19.25 16.402 19.7925C16.22 19.9322 16.0571 20.0951 15.9174 20.2771C15.375 20.9839 15.375 22.0101 15.375 24.0625C15.375 26.1149 15.375 27.1411 15.9174 27.8479C16.0571 28.0299 16.22 28.1929 16.402 28.3325C17.1089 28.875 18.1351 28.875 20.1875 28.875Z"
            stroke="#FFBE0A"
            stroke-width="2.625"
            stroke-linejoin="round"
          />
        </svg>

        <p className="text-center text-white text-[1.6rem] leading-[2.4rem]">
          Please wait!
          <br /> authenticating your Identity.
        </p>
      </div>
    </div>
  );
};
