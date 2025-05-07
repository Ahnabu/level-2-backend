import config from "../config"
import { USER_ROLE } from "../modules/user/user.constant"
import { User } from "../modules/user/user.model";

const superUser = {
    
        id: '0001',
        email: 'horairaabu013025@gmail.com',
        password: config.super_admin_password,
        needsPasswordChange: false,
     
    role: USER_ROLE.superAdmin,
        status: 'in-progress' ,
        isDeleted: false,
      
      
}

const seedSuperAdmin =async () => {
    
    const isSuperAdminExists = await User.findOne({ id: superUser.id });
    
    if (!isSuperAdminExists) {
        await User.create(superUser);
        console.log('Super Admin Created Successfully!');
    } else {
        console.log('Super Admin Already Exists!');
    }
}

export default seedSuperAdmin;