import { User } from "lucide-react";
import SettingSection from "./SettingSection";

const Profile = () => {
	return (
		<SettingSection icon={User} title={"Profile"}>
			<div className='flex flex-col sm:flex-row items-center mb-6'>
				<img
					src='https://pbs.twimg.com/profile_images/1617445332866170881/rebWaCpW_400x400.jpg'
					alt='Profile'
					className='rounded-full w-20 h-20 object-cover mr-4'
				/>

				<div>
					<h3 className='text-lg font-semibold text-tBase'>{localStorage.getItem('username')}</h3>
					<p className='text-tSecondary'>john.doe@example.com</p>
				</div>
			</div>

			<button className='bg-indigo-600 hover:bg-indigo-700 text-tBase font-bold py-2 px-4 rounded transition duration-200 w-full sm:w-auto'>
				Edit Profile
			</button>
		</SettingSection>
	);
};
export default Profile;
