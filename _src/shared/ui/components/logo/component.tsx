import Image from "next/image";
import CardsImage from "@public/playing-cards 1.webp";

export function Logo() {
	return (
		<div className="flex flex-row gap-1 items-center">
			<Image src={CardsImage} alt="Cards" width={38} height={38} />
			<svg
				width="164"
				height="38"
				viewBox="0 0 164 38"
				fill="none"
				xmlns="http://www.w3.org/2000/svg"
			>
				<path
					d="M161.672 8.73438C161.844 9.1875 161.961 9.58594 162.023 9.92969C162.102 10.2578 162.141 10.625 162.141 11.0312C162.141 11.5938 162.031 12.125 161.812 12.625C161.594 13.125 161.297 13.5703 160.922 13.9609C160.547 14.3359 160.109 14.6406 159.609 14.875C159.109 15.0938 158.57 15.2031 157.992 15.2031C157.914 15.2031 157.781 15.1953 157.594 15.1797C157.422 15.1641 157.219 15.1406 156.984 15.1094L156.469 15.0391C156.281 15.0859 156.094 15.1797 155.906 15.3203C155.719 15.4453 155.547 15.5938 155.391 15.7656C155.234 15.9219 155.102 16.0859 154.992 16.2578C154.898 16.4297 154.852 16.5859 154.852 16.7266C154.852 16.9297 155.016 17.0938 155.344 17.2188C155.688 17.3281 156.227 17.3984 156.961 17.4297L160.406 17.5938C161.391 17.6406 162.172 17.9219 162.75 18.4375C163.328 18.9375 163.617 19.6016 163.617 20.4297C163.617 21.2109 163.383 21.8828 162.914 22.4453C162.445 23.0234 161.859 23.5 161.156 23.875C160.453 24.25 159.695 24.5234 158.883 24.6953C158.086 24.8828 157.352 24.9766 156.68 24.9766C156.039 24.9766 155.438 24.9062 154.875 24.7656C154.312 24.6406 153.82 24.4609 153.398 24.2266C152.977 23.9922 152.641 23.7188 152.391 23.4062C152.156 23.0938 152.039 22.7578 152.039 22.3984C152.039 21.8984 152.234 21.3984 152.625 20.8984C153.031 20.3984 153.719 19.8047 154.688 19.1172C154.125 18.8516 153.742 18.625 153.539 18.4375C153.352 18.2344 153.258 17.9844 153.258 17.6875C153.258 17.4219 153.352 17.1562 153.539 16.8906C153.742 16.6094 154.062 16.2656 154.5 15.8594L155.648 14.7812C154.742 14.3438 154.094 13.8516 153.703 13.3047C153.328 12.7422 153.141 12.0391 153.141 11.1953C153.141 10.5859 153.258 10.0156 153.492 9.48438C153.727 8.9375 154.039 8.46875 154.43 8.07812C154.836 7.67188 155.312 7.35156 155.859 7.11719C156.406 6.88281 156.984 6.76562 157.594 6.76562C158.312 6.76562 159.031 6.89844 159.75 7.16406L160.359 7.39844C160.625 7.49219 160.867 7.57812 161.086 7.65625C161.32 7.71875 161.57 7.75 161.836 7.75H163.898V8.73438H161.672ZM155.25 19.2109C154.984 19.5234 154.766 19.7891 154.594 20.0078C154.422 20.2266 154.289 20.4219 154.195 20.5938C154.102 20.7656 154.031 20.9219 153.984 21.0625C153.953 21.2031 153.938 21.3516 153.938 21.5078C153.938 22.1016 154.281 22.5703 154.969 22.9141C155.672 23.2734 156.617 23.4531 157.805 23.4531C158.57 23.4531 159.266 23.3906 159.891 23.2656C160.516 23.1406 161.047 22.9609 161.484 22.7266C161.938 22.5078 162.281 22.2344 162.516 21.9062C162.766 21.5938 162.891 21.2422 162.891 20.8516C162.891 20.3672 162.641 20.0312 162.141 19.8438C161.641 19.6562 160.789 19.5625 159.586 19.5625C159.258 19.5625 158.883 19.5469 158.461 19.5156C158.055 19.5 157.648 19.4766 157.242 19.4453C156.852 19.4141 156.477 19.375 156.117 19.3281C155.773 19.2969 155.484 19.2578 155.25 19.2109ZM155.367 10.1875C155.367 10.8281 155.43 11.4219 155.555 11.9688C155.695 12.5 155.883 12.9609 156.117 13.3516C156.367 13.7266 156.656 14.0234 156.984 14.2422C157.328 14.4453 157.711 14.5469 158.133 14.5469C158.727 14.5469 159.203 14.3281 159.562 13.8906C159.922 13.4375 160.102 12.8359 160.102 12.0859C160.102 11.5391 160.031 10.9844 159.891 10.4219C159.766 9.85938 159.578 9.34375 159.328 8.875C159.109 8.45312 158.828 8.125 158.484 7.89062C158.141 7.64062 157.766 7.51562 157.359 7.51562C156.734 7.51562 156.242 7.75 155.883 8.21875C155.539 8.6875 155.367 9.3125 155.367 10.0938V10.1875Z"
					fill="#040108"
				/>
				<path
					d="M138.352 8.03125C139.086 7.82812 139.719 7.64062 140.25 7.46875C140.797 7.29688 141.391 7.08594 142.031 6.83594L142.242 6.88281V9.01562C142.695 8.59375 143.094 8.24219 143.438 7.96094C143.781 7.67969 144.094 7.46094 144.375 7.30469C144.672 7.13281 144.953 7.01562 145.219 6.95312C145.5 6.875 145.797 6.83594 146.109 6.83594C147.094 6.83594 147.867 7.1875 148.43 7.89062C148.992 8.59375 149.273 9.57812 149.273 10.8438V16.9844C149.273 17.625 149.383 18.0625 149.602 18.2969C149.82 18.5312 150.25 18.6875 150.891 18.7656V19.1406H145.336V18.7656C145.664 18.7344 145.938 18.6797 146.156 18.6016C146.375 18.5234 146.547 18.3984 146.672 18.2266C146.812 18.0547 146.906 17.8281 146.953 17.5469C147 17.2656 147.023 16.9141 147.023 16.4922V10.8906C147.023 9.17188 146.375 8.3125 145.078 8.3125C144.859 8.3125 144.648 8.33594 144.445 8.38281C144.242 8.42969 144.031 8.50781 143.812 8.61719C143.609 8.72656 143.383 8.88281 143.133 9.08594C142.898 9.28906 142.617 9.53906 142.289 9.83594V17.3594C142.289 17.8438 142.414 18.1875 142.664 18.3906C142.914 18.5781 143.383 18.7031 144.07 18.7656V19.1406H138.398V18.7656C138.742 18.7344 139.016 18.6875 139.219 18.625C139.438 18.5469 139.609 18.4297 139.734 18.2734C139.859 18.1172 139.945 17.9219 139.992 17.6875C140.039 17.4375 140.062 17.125 140.062 16.75V10.0938C140.062 9.4375 139.992 8.99219 139.852 8.75781C139.711 8.50781 139.453 8.38281 139.078 8.38281C138.797 8.38281 138.555 8.42188 138.352 8.5V8.03125Z"
					fill="#040108"
				/>
				<path
					d="M135.258 6.90625V16.4219C135.258 16.9062 135.273 17.2969 135.305 17.5938C135.352 17.875 135.445 18.1016 135.586 18.2734C135.727 18.4297 135.922 18.5391 136.172 18.6016C136.438 18.6641 136.797 18.7188 137.25 18.7656V19.1406H130.898V18.7656C131.367 18.7344 131.734 18.6875 132 18.625C132.281 18.5469 132.492 18.4297 132.633 18.2734C132.789 18.1016 132.891 17.875 132.938 17.5938C132.984 17.2969 133.008 16.9062 133.008 16.4219V10.2109C133.008 9.61719 132.938 9.20312 132.797 8.96875C132.672 8.71875 132.453 8.59375 132.141 8.59375C132.016 8.59375 131.867 8.60156 131.695 8.61719C131.539 8.63281 131.375 8.65625 131.203 8.6875L131.016 8.71094V8.3125L135.141 6.83594L135.258 6.90625ZM133.922 0.859375C134.297 0.859375 134.617 1 134.883 1.28125C135.148 1.54688 135.281 1.86719 135.281 2.24219C135.281 2.63281 135.148 2.96094 134.883 3.22656C134.633 3.47656 134.305 3.60156 133.898 3.60156C133.508 3.60156 133.188 3.47656 132.938 3.22656C132.688 2.96094 132.562 2.63281 132.562 2.24219C132.562 1.86719 132.695 1.54688 132.961 1.28125C133.227 1 133.547 0.859375 133.922 0.859375Z"
					fill="#040108"
				/>
				<path
					d="M117.516 8.03125C118.25 7.82812 118.883 7.64062 119.414 7.46875C119.961 7.29688 120.555 7.08594 121.195 6.83594L121.406 6.88281V9.01562C121.859 8.59375 122.258 8.24219 122.602 7.96094C122.945 7.67969 123.258 7.46094 123.539 7.30469C123.836 7.13281 124.117 7.01562 124.383 6.95312C124.664 6.875 124.961 6.83594 125.273 6.83594C126.258 6.83594 127.031 7.1875 127.594 7.89062C128.156 8.59375 128.438 9.57812 128.438 10.8438V16.9844C128.438 17.625 128.547 18.0625 128.766 18.2969C128.984 18.5312 129.414 18.6875 130.055 18.7656V19.1406H124.5V18.7656C124.828 18.7344 125.102 18.6797 125.32 18.6016C125.539 18.5234 125.711 18.3984 125.836 18.2266C125.977 18.0547 126.07 17.8281 126.117 17.5469C126.164 17.2656 126.188 16.9141 126.188 16.4922V10.8906C126.188 9.17188 125.539 8.3125 124.242 8.3125C124.023 8.3125 123.812 8.33594 123.609 8.38281C123.406 8.42969 123.195 8.50781 122.977 8.61719C122.773 8.72656 122.547 8.88281 122.297 9.08594C122.062 9.28906 121.781 9.53906 121.453 9.83594V17.3594C121.453 17.8438 121.578 18.1875 121.828 18.3906C122.078 18.5781 122.547 18.7031 123.234 18.7656V19.1406H117.562V18.7656C117.906 18.7344 118.18 18.6875 118.383 18.625C118.602 18.5469 118.773 18.4297 118.898 18.2734C119.023 18.1172 119.109 17.9219 119.156 17.6875C119.203 17.4375 119.227 17.125 119.227 16.75V10.0938C119.227 9.4375 119.156 8.99219 119.016 8.75781C118.875 8.50781 118.617 8.38281 118.242 8.38281C117.961 8.38281 117.719 8.42188 117.516 8.5V8.03125Z"
					fill="#040108"
				/>
				<path
					d="M104.133 8.03125C104.867 7.82812 105.5 7.64062 106.031 7.46875C106.578 7.29688 107.172 7.08594 107.812 6.83594L108.023 6.88281V9.01562C108.477 8.59375 108.875 8.24219 109.219 7.96094C109.562 7.67969 109.875 7.46094 110.156 7.30469C110.453 7.13281 110.734 7.01562 111 6.95312C111.281 6.875 111.578 6.83594 111.891 6.83594C112.875 6.83594 113.648 7.1875 114.211 7.89062C114.773 8.59375 115.055 9.57812 115.055 10.8438V16.9844C115.055 17.625 115.164 18.0625 115.383 18.2969C115.602 18.5312 116.031 18.6875 116.672 18.7656V19.1406H111.117V18.7656C111.445 18.7344 111.719 18.6797 111.938 18.6016C112.156 18.5234 112.328 18.3984 112.453 18.2266C112.594 18.0547 112.688 17.8281 112.734 17.5469C112.781 17.2656 112.805 16.9141 112.805 16.4922V10.8906C112.805 9.17188 112.156 8.3125 110.859 8.3125C110.641 8.3125 110.43 8.33594 110.227 8.38281C110.023 8.42969 109.812 8.50781 109.594 8.61719C109.391 8.72656 109.164 8.88281 108.914 9.08594C108.68 9.28906 108.398 9.53906 108.07 9.83594V17.3594C108.07 17.8438 108.195 18.1875 108.445 18.3906C108.695 18.5781 109.164 18.7031 109.852 18.7656V19.1406H104.18V18.7656C104.523 18.7344 104.797 18.6875 105 18.625C105.219 18.5469 105.391 18.4297 105.516 18.2734C105.641 18.1172 105.727 17.9219 105.773 17.6875C105.82 17.4375 105.844 17.125 105.844 16.75V10.0938C105.844 9.4375 105.773 8.99219 105.633 8.75781C105.492 8.50781 105.234 8.38281 104.859 8.38281C104.578 8.38281 104.336 8.42188 104.133 8.5V8.03125Z"
					fill="#040108"
				/>
				<path
					d="M101.672 16.3281C101.672 16.9219 101.727 17.3359 101.836 17.5703C101.945 17.7891 102.156 17.8984 102.469 17.8984C102.828 17.8984 103.219 17.7344 103.641 17.4062V18.0859C103.188 18.5859 102.789 18.9297 102.445 19.1172C102.102 19.3047 101.703 19.3984 101.25 19.3984C100.703 19.3984 100.297 19.25 100.031 18.9531C99.7812 18.6406 99.625 18.125 99.5625 17.4062C98.75 18.1094 98.0391 18.6172 97.4297 18.9297C96.8203 19.2422 96.2266 19.3984 95.6484 19.3984C94.8047 19.3984 94.1172 19.1328 93.5859 18.6016C93.0703 18.0703 92.8125 17.3828 92.8125 16.5391C92.8125 16.1172 92.8906 15.6953 93.0469 15.2734C93.2188 14.8359 93.4609 14.4844 93.7734 14.2188C94.0547 13.9688 94.3125 13.7578 94.5469 13.5859C94.7969 13.3984 95.1172 13.2109 95.5078 13.0234C95.8984 12.8203 96.4062 12.5938 97.0312 12.3438C97.6562 12.0938 98.4844 11.7578 99.5156 11.3359V9.625C99.5156 8.89062 99.3359 8.33594 98.9766 7.96094C98.6328 7.58594 98.1328 7.39844 97.4766 7.39844C96.9297 7.39844 96.4688 7.53125 96.0938 7.79688C95.7344 8.04688 95.5547 8.35156 95.5547 8.71094C95.5547 8.85156 95.5703 9.03125 95.6016 9.25C95.6484 9.46875 95.6719 9.64844 95.6719 9.78906C95.6719 10.1016 95.5469 10.3672 95.2969 10.5859C95.0625 10.8047 94.7891 10.9141 94.4766 10.9141C94.1641 10.9141 93.8906 10.8047 93.6562 10.5859C93.4375 10.3516 93.3281 10.0781 93.3281 9.76562C93.3281 9.42188 93.4219 9.07031 93.6094 8.71094C93.8125 8.35156 94.0859 8.03125 94.4297 7.75C94.7891 7.4375 95.2656 7.19531 95.8594 7.02344C96.4688 6.85156 97.125 6.76562 97.8281 6.76562C98.6406 6.76562 99.3203 6.90625 99.8672 7.1875C100.43 7.45312 100.859 7.82812 101.156 8.3125C101.344 8.625 101.477 8.99219 101.555 9.41406C101.633 9.82031 101.672 10.375 101.672 11.0781V16.3281ZM99.5156 11.9922C98.7031 12.2891 98.0078 12.5781 97.4297 12.8594C96.8672 13.125 96.4062 13.4062 96.0469 13.7031C95.7031 13.9844 95.4531 14.2891 95.2969 14.6172C95.1406 14.9453 95.0625 15.3047 95.0625 15.6953V15.8125C95.0625 16.0938 95.1094 16.3672 95.2031 16.6328C95.2969 16.8828 95.4219 17.1016 95.5781 17.2891C95.75 17.4766 95.9453 17.625 96.1641 17.7344C96.3828 17.8438 96.6094 17.8984 96.8438 17.8984C97.125 17.8984 97.4375 17.8438 97.7812 17.7344C98.1406 17.6094 98.4766 17.4609 98.7891 17.2891C99.1016 17.1172 99.2969 16.9375 99.375 16.75C99.4688 16.5625 99.5156 16.2656 99.5156 15.8594V11.9922Z"
					fill="#040108"
				/>
				<path
					d="M84.8672 2.03125C85.3359 1.92188 85.75 1.82812 86.1094 1.75C86.4844 1.65625 86.8359 1.5625 87.1641 1.46875C87.5078 1.375 87.8359 1.28125 88.1484 1.1875C88.4609 1.09375 88.7891 0.984375 89.1328 0.859375L89.25 0.929688V16.8906C89.25 17.2656 89.2734 17.5703 89.3203 17.8047C89.3672 18.0234 89.4609 18.2031 89.6016 18.3438C89.7422 18.4688 89.9375 18.5625 90.1875 18.625C90.4531 18.6875 90.7969 18.7344 91.2188 18.7656V19.1406H84.9375V18.7656C85.3594 18.7188 85.7031 18.6641 85.9688 18.6016C86.2344 18.5234 86.4453 18.4141 86.6016 18.2734C86.7578 18.1172 86.8594 17.9219 86.9062 17.6875C86.9688 17.4531 87 17.1562 87 16.7969V4.04688C87 3.42188 86.9141 3 86.7422 2.78125C86.5859 2.54688 86.2969 2.42969 85.875 2.42969C85.75 2.42969 85.6094 2.4375 85.4531 2.45312C85.3125 2.45312 85.1719 2.46094 85.0312 2.47656H84.8672V2.03125Z"
					fill="#040108"
				/>
				<path
					d="M74.9062 16.2578C74.9062 16.7422 74.9375 17.1406 75 17.4531C75.0625 17.75 75.1797 17.9844 75.3516 18.1562C75.5391 18.3281 75.7969 18.4531 76.125 18.5312C76.4531 18.5938 76.8828 18.6328 77.4141 18.6484V19.1406H69.9141V18.6484C70.4297 18.6016 70.8281 18.5391 71.1094 18.4609C71.4062 18.3828 71.6328 18.25 71.7891 18.0625C71.9453 17.875 72.0391 17.6172 72.0703 17.2891C72.1172 16.9453 72.1406 16.4922 72.1406 15.9297V4.35156C72.1406 3.86719 72.1172 3.48438 72.0703 3.20312C72.0234 2.90625 71.9219 2.67969 71.7656 2.52344C71.6094 2.35156 71.3828 2.22656 71.0859 2.14844C70.7891 2.07031 70.3984 2.00781 69.9141 1.96094V1.42188H76.9688C78.2969 1.42188 79.4922 1.60938 80.5547 1.98438C81.6328 2.35938 82.4453 2.85156 82.9922 3.46094C83.6641 4.25781 84 5.19531 84 6.27344C84 7.16406 83.7656 7.99219 83.2969 8.75781C82.8438 9.50781 82.2188 10.1016 81.4219 10.5391C80.8438 10.8516 80.1797 11.0781 79.4297 11.2188C78.6953 11.3594 77.7969 11.4297 76.7344 11.4297C76.3906 11.4297 76.0859 11.4297 75.8203 11.4297C75.5703 11.4141 75.2656 11.3984 74.9062 11.3828V16.2578ZM74.9062 10.2812C75.2188 10.3125 75.4766 10.3359 75.6797 10.3516C75.8984 10.3672 76.1406 10.375 76.4062 10.375C79.5156 10.375 81.0703 9.0625 81.0703 6.4375C81.0703 5.04688 80.6406 4.03125 79.7812 3.39062C78.9375 2.75 77.6016 2.42969 75.7734 2.42969C75.4141 2.42969 75.1797 2.49219 75.0703 2.61719C74.9609 2.72656 74.9062 2.96875 74.9062 3.34375V10.2812Z"
					fill="#040108"
				/>
				<path
					d="M53.7188 8.3125C54.1094 8.17188 54.4688 8.04688 54.7969 7.9375C55.125 7.8125 55.4375 7.69531 55.7344 7.58594C56.0469 7.46094 56.3516 7.34375 56.6484 7.23438C56.9609 7.10938 57.2969 6.97656 57.6562 6.83594L57.8203 6.88281V9.34375C58.1484 8.85938 58.4453 8.46094 58.7109 8.14844C58.9766 7.82031 59.2344 7.5625 59.4844 7.375C59.7344 7.17188 59.9766 7.03125 60.2109 6.95312C60.4609 6.875 60.7266 6.83594 61.0078 6.83594C61.4609 6.83594 61.8203 6.96875 62.0859 7.23438C62.3516 7.48438 62.4844 7.82031 62.4844 8.24219C62.4844 8.63281 62.3906 8.9375 62.2031 9.15625C62.0156 9.35938 61.7656 9.46094 61.4531 9.46094C61.2812 9.46094 61.1094 9.42969 60.9375 9.36719C60.7812 9.28906 60.5938 9.14062 60.375 8.92188C60.2344 8.79688 60.1016 8.70312 59.9766 8.64062C59.8516 8.57812 59.75 8.54688 59.6719 8.54688C59.4844 8.54688 59.2812 8.625 59.0625 8.78125C58.8594 8.92188 58.6641 9.10156 58.4766 9.32031C58.2891 9.53906 58.1328 9.77344 58.0078 10.0234C57.8828 10.2734 57.8203 10.5078 57.8203 10.7266V16.75C57.8203 17.125 57.8516 17.4375 57.9141 17.6875C57.9766 17.9375 58.0938 18.1406 58.2656 18.2969C58.4375 18.4375 58.6719 18.5469 58.9688 18.625C59.2656 18.7031 59.6406 18.75 60.0938 18.7656V19.1406H53.6484V18.7656C54.0703 18.6875 54.4062 18.6094 54.6562 18.5312C54.9219 18.4375 55.1172 18.3281 55.2422 18.2031C55.3828 18.0781 55.4688 17.9141 55.5 17.7109C55.5469 17.4922 55.5703 17.2188 55.5703 16.8906V10.2109C55.5703 9.61719 55.5 9.20312 55.3594 8.96875C55.2188 8.71875 54.9844 8.59375 54.6562 8.59375C54.4844 8.59375 54.3281 8.60156 54.1875 8.61719C54.0625 8.63281 53.9062 8.66406 53.7188 8.71094V8.3125Z"
					fill="#040108"
				/>
				<path
					d="M52.9922 14.9453C52.4297 16.4141 51.6641 17.5234 50.6953 18.2734C49.7422 19.0234 48.6172 19.3984 47.3203 19.3984C46.5547 19.3984 45.8594 19.2578 45.2344 18.9766C44.625 18.6953 44.1016 18.2969 43.6641 17.7812C43.2266 17.2656 42.8906 16.6406 42.6562 15.9062C42.4219 15.1719 42.3047 14.3438 42.3047 13.4219C42.3047 12.4375 42.4375 11.5391 42.7031 10.7266C42.9844 9.91406 43.3672 9.21875 43.8516 8.64062C44.3516 8.04688 44.9453 7.58594 45.6328 7.25781C46.3203 6.92969 47.0781 6.76562 47.9062 6.76562C48.6094 6.76562 49.25 6.89844 49.8281 7.16406C50.4219 7.42969 50.9219 7.80469 51.3281 8.28906C51.5 8.50781 51.6406 8.72656 51.75 8.94531C51.875 9.16406 51.9766 9.40625 52.0547 9.67188C52.1484 9.9375 52.2266 10.2344 52.2891 10.5625C52.3516 10.8906 52.4141 11.2656 52.4766 11.6875H44.25C44.2812 12.5469 44.3516 13.2578 44.4609 13.8203C44.5859 14.3672 44.7812 14.8984 45.0469 15.4141C45.8125 16.8516 46.9375 17.5703 48.4219 17.5703C49.2812 17.5703 50.0234 17.3594 50.6484 16.9375C51.2891 16.5156 51.9297 15.7969 52.5703 14.7812L52.9922 14.9453ZM49.7578 10.7969C49.5859 9.64062 49.3047 8.84375 48.9141 8.40625C48.5391 7.95312 47.9453 7.72656 47.1328 7.72656C46.3047 7.72656 45.6562 7.96875 45.1875 8.45312C44.7344 8.9375 44.4375 9.71875 44.2969 10.7969H49.7578Z"
					fill="#040108"
				/>
				<path
					d="M28.4531 2.03125L29.25 1.84375C29.6562 1.73438 30.0078 1.64062 30.3047 1.5625C30.6016 1.46875 30.875 1.38281 31.125 1.30469C31.3906 1.22656 31.6328 1.15625 31.8516 1.09375C32.0859 1.01562 32.3359 0.9375 32.6016 0.859375L32.6953 0.929688V12.1797L36.375 8.89844C36.7812 8.52344 36.9844 8.20312 36.9844 7.9375C36.9844 7.78125 36.8906 7.67188 36.7031 7.60938C36.5156 7.54688 36.1641 7.5 35.6484 7.46875V7.09375H41.1094V7.51562C40.6875 7.5 40.3047 7.53125 39.9609 7.60938C39.6172 7.67188 39.2422 7.82031 38.8359 8.05469C38.4297 8.28906 37.9531 8.63281 37.4062 9.08594C36.8594 9.52344 36.1641 10.1172 35.3203 10.8672L34.5469 11.5703L38.6719 16.7969C39.2188 17.4844 39.7188 17.9766 40.1719 18.2734C40.6406 18.5547 41.1719 18.7188 41.7656 18.7656V19.1406H35.9531V18.7656H36.4453C36.6172 18.7656 36.75 18.7266 36.8438 18.6484C36.9531 18.5703 37.0078 18.4688 37.0078 18.3438C37.0078 18.2656 36.9844 18.1875 36.9375 18.1094C36.9062 18.0156 36.8281 17.9062 36.7031 17.7812C36.6094 17.6562 36.5547 17.5781 36.5391 17.5469L36.4453 17.4297L32.6953 12.4375V17.3594C32.6953 17.8125 32.8047 18.1484 33.0234 18.3672C33.2578 18.5703 33.6406 18.6875 34.1719 18.7188L34.7109 18.7656V19.1406H28.4531V18.7656C28.9219 18.6875 29.2891 18.6172 29.5547 18.5547C29.8359 18.4766 30.0391 18.3828 30.1641 18.2734C30.2891 18.1484 30.3672 17.9844 30.3984 17.7812C30.4297 17.5781 30.4453 17.3047 30.4453 16.9609V4.04688C30.4453 3.40625 30.3672 2.97656 30.2109 2.75781C30.0547 2.53906 29.75 2.42969 29.2969 2.42969C29.1719 2.42969 29.0391 2.4375 28.8984 2.45312C28.7734 2.45312 28.625 2.46094 28.4531 2.47656V2.03125Z"
					fill="#040108"
				/>
				<path
					d="M21.5625 6.83594C22.4219 6.83594 23.2109 6.98438 23.9297 7.28125C24.6484 7.57812 25.2656 8 25.7812 8.54688C26.3125 9.07812 26.7266 9.71094 27.0234 10.4453C27.3203 11.1797 27.4688 11.9922 27.4688 12.8828C27.4688 13.8203 27.3125 14.6875 27 15.4844C26.7031 16.2656 26.2891 16.9531 25.7578 17.5469C25.2266 18.125 24.5938 18.5781 23.8594 18.9062C23.1406 19.2344 22.3594 19.3984 21.5156 19.3984C20.6719 19.3984 19.8906 19.2422 19.1719 18.9297C18.4531 18.6172 17.8359 18.1797 17.3203 17.6172C16.8047 17.0547 16.3984 16.3906 16.1016 15.625C15.8047 14.8594 15.6562 14.0234 15.6562 13.1172C15.6562 12.1953 15.7969 11.3516 16.0781 10.5859C16.375 9.80469 16.7812 9.14062 17.2969 8.59375C17.8125 8.03125 18.4297 7.60156 19.1484 7.30469C19.8828 6.99219 20.6875 6.83594 21.5625 6.83594ZM21.1641 7.58594C20.2266 7.58594 19.4766 7.96875 18.9141 8.73438C18.3516 9.5 18.0703 10.5156 18.0703 11.7812C18.0703 12.7344 18.1719 13.6641 18.375 14.5703C18.5781 15.4609 18.8672 16.2578 19.2422 16.9609C19.5234 17.5078 19.8984 17.9297 20.3672 18.2266C20.8359 18.5234 21.3438 18.6719 21.8906 18.6719C22.875 18.6719 23.6406 18.2422 24.1875 17.3828C24.75 16.5078 25.0312 15.3125 25.0312 13.7969C25.0312 12.6562 24.8672 11.5938 24.5391 10.6094C24.2109 9.625 23.7656 8.88281 23.2031 8.38281C22.9062 8.10156 22.5938 7.89844 22.2656 7.77344C21.9375 7.64844 21.5703 7.58594 21.1641 7.58594Z"
					fill="#040108"
				/>
				<path
					d="M5.41406 16.2578C5.41406 16.7422 5.44531 17.1406 5.50781 17.4531C5.57031 17.75 5.6875 17.9844 5.85938 18.1562C6.04688 18.3281 6.30469 18.4531 6.63281 18.5312C6.96094 18.5938 7.39062 18.6328 7.92188 18.6484V19.1406H0.421875V18.6484C0.9375 18.6016 1.33594 18.5391 1.61719 18.4609C1.91406 18.3828 2.14062 18.25 2.29688 18.0625C2.45312 17.875 2.54688 17.6172 2.57812 17.2891C2.625 16.9453 2.64844 16.4922 2.64844 15.9297V4.35156C2.64844 3.86719 2.625 3.48438 2.57812 3.20312C2.53125 2.90625 2.42969 2.67969 2.27344 2.52344C2.11719 2.35156 1.89062 2.22656 1.59375 2.14844C1.29688 2.07031 0.90625 2.00781 0.421875 1.96094V1.42188H7.47656C8.80469 1.42188 10 1.60938 11.0625 1.98438C12.1406 2.35938 12.9531 2.85156 13.5 3.46094C14.1719 4.25781 14.5078 5.19531 14.5078 6.27344C14.5078 7.16406 14.2734 7.99219 13.8047 8.75781C13.3516 9.50781 12.7266 10.1016 11.9297 10.5391C11.3516 10.8516 10.6875 11.0781 9.9375 11.2188C9.20312 11.3594 8.30469 11.4297 7.24219 11.4297C6.89844 11.4297 6.59375 11.4297 6.32812 11.4297C6.07812 11.4141 5.77344 11.3984 5.41406 11.3828V16.2578ZM5.41406 10.2812C5.72656 10.3125 5.98438 10.3359 6.1875 10.3516C6.40625 10.3672 6.64844 10.375 6.91406 10.375C10.0234 10.375 11.5781 9.0625 11.5781 6.4375C11.5781 5.04688 11.1484 4.03125 10.2891 3.39062C9.44531 2.75 8.10938 2.42969 6.28125 2.42969C5.92188 2.42969 5.6875 2.49219 5.57812 2.61719C5.46875 2.72656 5.41406 2.96875 5.41406 3.34375V10.2812Z"
					fill="#040108"
				/>
				<path
					d="M19.4205 29.777C19.4205 30.6974 19.2543 31.4929 18.9219 32.1634C18.5895 32.8338 18.1335 33.3509 17.554 33.7145C16.9744 34.0781 16.3125 34.2599 15.5682 34.2599C14.8239 34.2599 14.1619 34.0781 13.5824 33.7145C13.0028 33.3509 12.5469 32.8338 12.2145 32.1634C11.8821 31.4929 11.7159 30.6974 11.7159 29.777C11.7159 28.8565 11.8821 28.0611 12.2145 27.3906C12.5469 26.7202 13.0028 26.2031 13.5824 25.8395C14.1619 25.4759 14.8239 25.294 15.5682 25.294C16.3125 25.294 16.9744 25.4759 17.554 25.8395C18.1335 26.2031 18.5895 26.7202 18.9219 27.3906C19.2543 28.0611 19.4205 28.8565 19.4205 29.777ZM18.3977 29.777C18.3977 29.0213 18.2713 28.3835 18.0185 27.8636C17.7685 27.3438 17.429 26.9503 17 26.6832C16.5739 26.4162 16.0966 26.2827 15.5682 26.2827C15.0398 26.2827 14.5611 26.4162 14.1321 26.6832C13.706 26.9503 13.3665 27.3438 13.1136 27.8636C12.8636 28.3835 12.7386 29.0213 12.7386 29.777C12.7386 30.5327 12.8636 31.1705 13.1136 31.6903C13.3665 32.2102 13.706 32.6037 14.1321 32.8707C14.5611 33.1378 15.0398 33.2713 15.5682 33.2713C16.0966 33.2713 16.5739 33.1378 17 32.8707C17.429 32.6037 17.7685 32.2102 18.0185 31.6903C18.2713 31.1705 18.3977 30.5327 18.3977 29.777ZM22.0668 30.2031V34.1406H21.0611V27.5952H22.0327V28.6179H22.1179C22.2713 28.2855 22.5043 28.0185 22.8168 27.8168C23.1293 27.6122 23.5327 27.5099 24.027 27.5099C24.4702 27.5099 24.858 27.6009 25.1903 27.7827C25.5227 27.9616 25.7813 28.2344 25.9659 28.6009C26.1506 28.9645 26.2429 29.4247 26.2429 29.9815V34.1406H25.2372V30.0497C25.2372 29.5355 25.1037 29.1349 24.8366 28.848C24.5696 28.5582 24.2031 28.4134 23.7372 28.4134C23.4162 28.4134 23.1293 28.483 22.8764 28.6222C22.6264 28.7614 22.429 28.9645 22.2841 29.2315C22.1392 29.4986 22.0668 29.8224 22.0668 30.2031ZM29.0863 25.4134V34.1406H28.0806V25.4134H29.0863ZM30.9283 34.1406V27.5952H31.9339V34.1406H30.9283ZM31.4396 26.5043C31.2436 26.5043 31.0746 26.4375 30.9325 26.304C30.7933 26.1705 30.7237 26.0099 30.7237 25.8224C30.7237 25.6349 30.7933 25.4744 30.9325 25.3409C31.0746 25.2074 31.2436 25.1406 31.4396 25.1406C31.6357 25.1406 31.8033 25.2074 31.9425 25.3409C32.0845 25.4744 32.1555 25.6349 32.1555 25.8224C32.1555 26.0099 32.0845 26.1705 31.9425 26.304C31.8033 26.4375 31.6357 26.5043 31.4396 26.5043ZM34.7816 30.2031V34.1406H33.7759V27.5952H34.7475V28.6179H34.8327C34.9862 28.2855 35.2191 28.0185 35.5316 27.8168C35.8441 27.6122 36.2475 27.5099 36.7418 27.5099C37.185 27.5099 37.5728 27.6009 37.9052 27.7827C38.2376 27.9616 38.4961 28.2344 38.6808 28.6009C38.8654 28.9645 38.9577 29.4247 38.9577 29.9815V34.1406H37.9521V30.0497C37.9521 29.5355 37.8185 29.1349 37.5515 28.848C37.2844 28.5582 36.918 28.4134 36.4521 28.4134C36.131 28.4134 35.8441 28.483 35.5913 28.6222C35.3413 28.7614 35.1438 28.9645 34.9989 29.2315C34.854 29.4986 34.7816 29.8224 34.7816 30.2031ZM43.5398 34.277C42.9091 34.277 42.3651 34.1378 41.9077 33.8594C41.4531 33.5781 41.1023 33.1861 40.8551 32.6832C40.6108 32.1776 40.4886 31.5895 40.4886 30.919C40.4886 30.2486 40.6108 29.6577 40.8551 29.1463C41.1023 28.6321 41.446 28.2315 41.8864 27.9446C42.3295 27.6548 42.8466 27.5099 43.4375 27.5099C43.7784 27.5099 44.1151 27.5668 44.4474 27.6804C44.7798 27.794 45.0824 27.9787 45.3551 28.2344C45.6278 28.4872 45.8452 28.8224 46.0071 29.2401C46.169 29.6577 46.25 30.1719 46.25 30.7827V31.2088H41.2045V30.3395H45.2273C45.2273 29.9702 45.1534 29.6406 45.0057 29.3509C44.8608 29.0611 44.6534 28.8324 44.3835 28.6648C44.1165 28.4972 43.8011 28.4134 43.4375 28.4134C43.0369 28.4134 42.6903 28.5128 42.3977 28.7116C42.108 28.9077 41.8849 29.1634 41.7287 29.4787C41.5724 29.794 41.4943 30.1321 41.4943 30.4929V31.0724C41.4943 31.5668 41.5795 31.9858 41.75 32.3295C41.9233 32.6705 42.1634 32.9304 42.4702 33.1094C42.777 33.2855 43.1335 33.3736 43.5398 33.3736C43.804 33.3736 44.0426 33.3366 44.2557 33.2628C44.4716 33.1861 44.6577 33.0724 44.8139 32.9219C44.9702 32.7685 45.0909 32.5781 45.1761 32.3509L46.1477 32.6236C46.0455 32.9531 45.8736 33.2429 45.6321 33.4929C45.3906 33.7401 45.0923 33.9332 44.7372 34.0724C44.3821 34.2088 43.983 34.277 43.5398 34.277Z"
					fill="#040108"
				/>
				<circle cx="3" cy="29.1406" r="3" fill="#59B25C" />
			</svg>
		</div>
	);
}
