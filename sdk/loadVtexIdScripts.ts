function handleLoadScript(src: string, onLoadCallBack: () => void) {
  const script = document.createElement("script");
  script.src = src;
  script.async = true;

  script.onload = () => {
    onLoadCallBack();
  };
  document.head.appendChild(script);
}

function handleLoadCss(styles: string) {
  const style = document.createElement("style");
  style.innerHTML = styles;
  document.head.appendChild(style);
}

function handleSetScope() {
  // @ts-expect-error vtexId is a global variable
  window.vtexid.setScope("5d9f2d19-f9b8-4999-bbcd-0271c714b462");
  // @ts-expect-error vtexId is a global variable
  window.vtexid.setScopeName("tfcucl");
}

export function loadVtexIdScripts(callBack: () => void) {
  handleLoadCss(`
    #vtexIdContainer {
      .modal-header {
        background-color: white;
    
        .vtexIdUI-user {
          font-family: $font-inter;
          font-size: 12px;
          font-weight: 400;
        }
      }
    
      .modal-footer {
        background-color: white;
        border: none;
      }
    
      .vtexIdUI-classic-login-control {
        a {
          font-family: $font-inter;
          font-weight: 700;
          font-size: 14px;
          color: $color-dark;
        }
      }
    
      .vtexIdUI-close {
        background-color: transparent;
        font-size: 0;
        background-image: url("data:image/svg+xml,%3Csvg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M18 6L6 18M6 6L18 18' stroke='black' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E%0A");
        width: 24px;
        height: 24px;
        display: block;
        top: 16px;
        right: 16px;
      }
    
      .vtexIdUI {
        border: none;
        border-radius: 20px;
        box-shadow: 0 7px 10px 0 rgba(0, 0, 0, 0.03);
    
        // @include desktop {
        //     width: 550px;
    
        //     &-page {
        //         padding: 40px;
        //     }
        // }
      }
    
      h4 {
        font-family: $font-inter;
        font-size: 14px;
        font-weight: 400;
        color: $color-dark;
      }
    
      .vtexIdUI-confirm-email,
      .vtexIdUI-classic-login,
      .vtexIdUI-change-pswd {
        input {
          width: 100% !important;
          max-width: unset !important;
          box-sizing: border-box;
          box-shadow: none;
          color: $color-dark;
          font-size: 13px;
          font-weight: 500;
          font-family: $font-inter;
          height: 100%;
          border: 1px solid $color-stroke2;
          border-radius: 6px;
          line-height: 9px;
          box-shadow: 0 7px 10px 0 rgba(0, 0, 0, 3%);
          height: 48px;
        }
    
        .vtexIdUI-back-link {
          width: 49%;
          background-color: white;
          border: 2px solid $color-dark;
          border-radius: 6px;
          font-family: $font-lemon;
          font-size: 13px;
          font-weight: 700;
          color: $color-dark;
          display: flex;
          justify-content: center;
          align-items: center;
          height: 56px;
          margin: 0;
    
          &::before {
            content: "";
            background-image: url("data:image/svg+xml,%3Csvg width='16' height='16' viewBox='0 0 16 16' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M8.00016 12.6663L3.3335 7.99967M3.3335 7.99967L8.00016 3.33301M3.3335 7.99967H12.6668' stroke='%233C3C3B' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E%0A");
            width: 16px;
            height: 16px;
            display: block;
            margin-right: 24px;
          }
          .vtexid-icon-arrow-left {
            display: none;
          }
        }
    
        #sendAccessKeyBtn,
        #classicLoginBtn,
        #tryChangePswdBtn {
          background: $gradient !important;
          background-image: none;
          border: none;
          border-radius: 6px;
          font-family: $font-lemon;
          font-size: 13px;
          font-weight: 700;
          box-shadow: none;
          display: flex;
          justify-content: center;
          align-items: center;
          height: 56px;
          width: 49%;
    
          &::after {
            content: "";
            background-image: url("data:image/svg+xml,%3Csvg width='16' height='16' viewBox='0 0 16 16' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M13.3332 4L5.99984 11.3333L2.6665 8' stroke='white' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E%0A");
            width: 16px;
            height: 16px;
            display: block;
            margin-left: 24px;
            flex-shrink: 0;
          }
        }
    
        #tryChangePswdBtn {
          font-size: 0;
    
          &::before {
            content: "Cadastrar senha";
            font-family: $font-lemon;
            font-size: 13px;
            font-weight: 700;
          }
        }
    
        //     h4 {
        //       font-family: $font-lemon;
        //       font-size: 18px;
        //       font-weight: 700;
        //       color: $color-dark;
        //     }
      }
    
      .vtexIdUI-change-pswd {
        .vtexid-icon-lock {
            display: none;
        }
    
        .modal-footer {
            display: flex;
            gap: 8px;
    
            .vtexIdUI-back-link {
                width: auto;
                flex: 1;
            }
    
            #tryChangePswdBtn {
                width: fit-content;
            }
        }
        
        small span {
            font-family: $font-inter;
            font-size: 13px;
            font-weight: 500;
            color: #3c3c3b;
        }
    
        .control-group {
          position: relative;
        }
    
        label {
          font-family: $font-inter;
          font-size: 11px;
          font-weight: 500;
          position: absolute;
          top: 11px;
          left: 16px;
          line-height: 8px;
          z-index: 10;
          color: #8e8e8d;
        }
    
        input {
          padding: 15px 0 0 15px;
          margin: 0;
        }
    
        .vtexid-icon-checkmark {
          background-image: url("data:image/svg+xml,%3Csvg width='18' height='18' viewBox='0 0 18 18' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M15 4.5L6.75 12.75L3 9' stroke='%238CBF3C' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E%0A");
          width: 18px;
          height: 18px;
        }
    
        .vtexid-password-requirements {
            padding: 24px 0;
            margin-top: 24px;
            border-top: 1px solid #D2D2D2;
            border-bottom: 1px solid #D2D2D2;
        }
    
        .vtexid-password-requirements-description {
          font-size: 0;
    
          &::after {
            content: "Sua senha deve ter pelo menos:";
            font-family: $font-inter;
            font-size: 13px;
            font-weight: 500;
            color: #3c3c3b;
          }
        }
    
        .vtexid-password-requirements-list {
          display: grid;
          grid-template-columns: auto auto;
          gap: 12px;
          padding-top: 12px;
          margin: 0;
    
          li {
            display: flex;
            gap: 11px;
          }
    
          span {
            font-family: $font-inter;
            font-size: 13px;
            font-weight: 500;
            color: #3c3c3b;
          }
        }
      }
    
      .vtexIdUI-providers-list {
        li {
          margin-bottom: 8px;
        }
      }
    
      #loginWithUserAndPasswordBtn {
        height: 56px;
        background: $gradient !important;
        display: flex;
        justify-content: center;
        align-items: center;
        box-shadow: none;
        border: none;
        border-radius: 6px;
        background-image: none;
        font-family: $font-lemon;
        font-size: 13px;
        font-weight: 700;
        color: white;
        text-shadow: none;
    
        &::after {
          content: "";
          background-image: url("data:image/svg+xml,%3Csvg width='16' height='16' viewBox='0 0 16 16' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M13.3334 14V12.6667C13.3334 11.9594 13.0525 11.2811 12.5524 10.781C12.0523 10.281 11.374 10 10.6667 10H5.33341C4.62617 10 3.94789 10.281 3.4478 10.781C2.9477 11.2811 2.66675 11.9594 2.66675 12.6667V14M10.6667 4.66667C10.6667 6.13943 9.47284 7.33333 8.00008 7.33333C6.52732 7.33333 5.33341 6.13943 5.33341 4.66667C5.33341 3.19391 6.52732 2 8.00008 2C9.47284 2 10.6667 3.19391 10.6667 4.66667Z' stroke='white' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E%0A");
          width: 16px;
          height: 16px;
          display: block;
          margin-left: 25px;
        }
      }
    
      #vtexIdUI-google-plus {
        background-color: $color-dark;
        border: none;
        border-radius: 6px;
        background-image: none;
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 0 12px;
        height: 56px;
        box-shadow: none;
    
        p,
        .vtexid-icon-google-plus {
          display: none;
        }
    
        &::before {
          content: "Entrar com Google";
          font-family: $font-lemon;
          font-size: 13px;
          font-weight: 700;
          color: white;
          text-shadow: none;
        }
    
        &::after {
          content: "";
          background-image: url("data:image/svg+xml,%3Csvg width='16' height='16' viewBox='0 0 16 16' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M15.3335 7.83681C15.3335 7.31507 15.292 6.79332 15.2088 6.28223H8.1521V9.23168H12.1949C12.0286 10.1793 11.4882 11.0312 10.6983 11.5636V13.4802H13.1095C14.5229 12.1492 15.3335 10.1793 15.3335 7.83681Z' fill='white'/%3E%3Cpath d='M8.15229 15.3338C10.1685 15.3338 11.8729 14.6523 13.1097 13.481L10.6985 11.5644C10.023 12.0329 9.16039 12.2991 8.15229 12.2991C6.19845 12.2991 4.54599 10.9469 3.9536 9.13672H1.46973V11.1172C2.73765 13.7046 5.32545 15.3338 8.15229 15.3338Z' fill='white'/%3E%3Cpath d='M3.95399 9.1362C3.64216 8.18854 3.64216 7.1557 3.95399 6.19739V4.22754H1.46972C0.399091 6.38905 0.399091 8.94454 1.46972 11.1061L3.95399 9.1362Z' fill='white'/%3E%3Cpath d='M8.15229 3.0351C9.22275 3.01381 10.2516 3.42907 11.0207 4.18507L13.1616 1.99161C11.8002 0.692574 10.0126 -0.0208323 8.15229 0.000463405C5.32545 0.000463405 2.73765 1.64023 1.46973 4.22766L3.9536 6.20816C4.54599 4.38738 6.19845 3.0351 8.15229 3.0351Z' fill='white'/%3E%3C/svg%3E%0A");
          width: 16px;
          height: 16px;
          display: block;
          margin-left: 25px;
        }
      }
    
      #vtexIdUI-facebook {
        background-color: $color-dark;
        border: none;
        border-radius: 6px;
        background-image: none;
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 0 12px;
        height: 56px;
        box-shadow: none;
    
        p,
        .vtexid-icon-facebook {
          display: none;
        }
    
        &::before {
          content: "Entrar com Facebook";
          font-family: $font-lemon;
          font-size: 13px;
          font-weight: 700;
          color: white;
          text-shadow: none;
        }
    
        &::after {
          content: "";
          background-image: url("data:image/svg+xml,%3Csvg width='16' height='16' viewBox='0 0 16 16' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M12.0001 1.33301H10.0001C9.11603 1.33301 8.26818 1.6842 7.64306 2.30932C7.01794 2.93444 6.66675 3.78229 6.66675 4.66634V6.66634H4.66675V9.33301H6.66675V14.6663H9.33341V9.33301H11.3334L12.0001 6.66634H9.33341V4.66634C9.33341 4.48953 9.40365 4.31996 9.52868 4.19494C9.6537 4.06991 9.82327 3.99967 10.0001 3.99967H12.0001V1.33301Z' fill='white'/%3E%3C/svg%3E%0A");
          width: 16px;
          height: 16px;
          display: block;
          margin-left: 25px;
        }
      }
    
      #loginWithAccessKeyBtn {
        background-color: transparent;
        box-shadow: none;
        border-radius: 6px;
        border: 2px solid #e4003f;
        background-image: none;
        height: 56px;
    
        span {
          background-image: linear-gradient(270deg, #e9530e, #e4003f);
          background-clip: text;
          text-fill-color: transparent;
          -webkit-text-fill-color: transparent;
          text-shadow: none;
          font-size: 0;
          display: flex;
          align-items: center;
          justify-content: center;
    
          &::before {
            font-family: $font-lemon;
            font-size: 13px;
            font-weight: 700;
            text-transform: uppercase;
            content: "Receber uma chave de acesso rápido";
            display: block;
          }
    
          &::after {
            content: "";
            background-image: url("data:image/svg+xml,%3Csvg width='17' height='16' viewBox='0 0 17 16' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cg clip-path='url(%23clip0_5558_9225)'%3E%3Cpath d='M14.4999 1.33301L13.1666 2.66634M13.1666 2.66634L15.1666 4.66634L12.8333 6.99967L10.8333 4.99967M13.1666 2.66634L10.8333 4.99967M8.09327 7.73967C8.4375 8.07932 8.71114 8.4837 8.89844 8.92954C9.08574 9.37537 9.183 9.85385 9.18462 10.3374C9.18624 10.821 9.09219 11.3001 8.90788 11.7472C8.72357 12.1943 8.45265 12.6005 8.1107 12.9424C7.76876 13.2844 7.36255 13.5553 6.91547 13.7396C6.46839 13.9239 5.98927 14.018 5.50569 14.0164C5.02212 14.0147 4.54363 13.9175 4.0978 13.7302C3.65196 13.5429 3.24758 13.2692 2.90794 12.925C2.24003 12.2335 1.87045 11.3073 1.8788 10.3459C1.88715 9.38448 2.27277 8.46484 2.9526 7.78501C3.63243 7.10518 4.55208 6.71956 5.51347 6.7112C6.47486 6.70285 7.40106 7.07243 8.09261 7.74034L8.09327 7.73967ZM8.09327 7.73967L10.8333 4.99967' stroke='url(%23paint0_linear_5558_9225)' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/g%3E%3Cdefs%3E%3ClinearGradient id='paint0_linear_5558_9225' x1='15.1666' y1='7.67469' x2='1.87866' y2='7.67469' gradientUnits='userSpaceOnUse'%3E%3Cstop stop-color='%23E9530E'/%3E%3Cstop offset='1' stop-color='%23E4003F'/%3E%3C/linearGradient%3E%3CclipPath id='clip0_5558_9225'%3E%3Crect width='16' height='16' fill='white' transform='translate(0.5)'/%3E%3C/clipPath%3E%3C/defs%3E%3C/svg%3E%0A");
            width: 17px;
            height: 16px;
            display: none;
            margin-left: 25px;
    
            @include desktop {
              display: block;
            }
          }
        }
      }
    }  
  `);
  handleLoadScript(
    "https://io.vtex.com.br/front-libs/jquery/1.8.3/jquery-1.8.3.min.js?v=*",
    () => {
      handleLoadScript(
        "https://io.vtex.com.br/vtex-id-ui/3.27.1/vtexid-jquery.min.js?v=*",
        () => {
          handleSetScope();
          callBack();
        },
      );
    },
  );
}
