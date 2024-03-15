import Icon from "deco-sites/true-source/components/ui/Icon.tsx";


export interface Props {
  teste?: string
}

{/* <div class="chat-container snipcss-hsU7e" style="display: none">
  <Icon id="OpenMobile" class="open-mobile" size={24}  />
  <Icon id="CloseMobile" class="close-mobile" size={24}  />

  <div class="whatsapp-container" id="whatsapp-flutuante">
    <span>
      Dúvidas de pedidos
    </span>

    <Icon id="IconDesktop" class='icon-desktop' size={16}  />

    <Icon id="IconMobile" class='icon-mobile' size={16}  />

    </div>
</div> */}

function FloatingButtons({ teste }: Props) {
  return (
    <div>
      <iframe class="neoasssist-widget-frame neoasssist-widget-frame-1 h-full w-full" src="https://cdn.atendimen.to/widget/f9144a485753ae5e6e66c6402fb63f27/current" id="neoassist-widget-frame-1" style="display: inline-block; border: 0px; overflow: hidden; bottom: 5px; right: 240px; position: fixed;"></iframe>

      {/* <div class="fixed right-6 bottom-[10px] flex">
        <svg class="open-mobile hidden" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M7.5 10.5H7.51M12 10.5H12.01M16.5 10.5H16.51M7 18V20.3355C7 20.8684 7 21.1348 7.10923 21.2716C7.20422 21.3906 7.34827 21.4599 7.50054 21.4597C7.67563 21.4595 7.88367 21.2931 8.29976 20.9602L10.6852 19.0518C11.1725 18.662 11.4162 18.4671 11.6875 18.3285C11.9282 18.2055 12.1844 18.1156 12.4492 18.0613C12.7477 18 13.0597 18 13.6837 18H16.2C17.8802 18 18.7202 18 19.362 17.673C19.9265 17.3854 20.3854 16.9265 20.673 16.362C21 15.7202 21 14.8802 21 13.2V7.8C21 6.11984 21 5.27976 20.673 4.63803C20.3854 4.07354 19.9265 3.6146 19.362 3.32698C18.7202 3 17.8802 3 16.2 3H7.8C6.11984 3 5.27976 3 4.63803 3.32698C4.07354 3.6146 3.6146 4.07354 3.32698 4.63803C3 5.27976 3 6.11984 3 7.8V14C3 14.93 3 15.395 3.10222 15.7765C3.37962 16.8117 4.18827 17.6204 5.22354 17.8978C5.60504 18 6.07003 18 7 18ZM8 10.5C8 10.7761 7.77614 11 7.5 11C7.22386 11 7 10.7761 7 10.5C7 10.2239 7.22386 10 7.5 10C7.77614 10 8 10.2239 8 10.5ZM12.5 10.5C12.5 10.7761 12.2761 11 12 11C11.7239 11 11.5 10.7761 11.5 10.5C11.5 10.2239 11.7239 10 12 10C12.2761 10 12.5 10.2239 12.5 10.5ZM17 10.5C17 10.7761 16.7761 11 16.5 11C16.2239 11 16 10.7761 16 10.5C16 10.2239 16.2239 10 16.5 10C16.7761 10 17 10.2239 17 10.5Z" stroke="#F0E9E9" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path></svg><svg class="close-mobile hidden" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M15 9L9 15M9 9L15 15M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z" stroke="#F0E9E9" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
        </svg>

        <div class="bg-[#8cbf3c] items-center rounded-[300px] flex gap-2 h-[40px] min-w-[207px] px-6 w-[207px] inset-0" id="whatsapp-flutuante">
          <span class='text-[14px] text-white'>Dúvidas de pedidos</span>
          <Icon id="WhatsApp" size={16} class='text-white' />
        </div>
      </div> */}
    </div >
  )
}

export default FloatingButtons