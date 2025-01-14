import UserPG from "../modules/user/entity/User.PG"
import UserRole from '../modules/user/entity/contracts/UserRole'

export const superAdmin = async () => {
  try {
    const validateSuperAdmin = await UserPG.findOne({where: {role: UserRole.SUPERADMIN}})

    if(validateSuperAdmin){
      return
    }

    const superAdmin = UserPG.create({
      mobile: '09029552202',
      role: UserRole.SUPERADMIN,
      name: 'superAdmin'
    })

    await superAdmin.save()
    console.log('success created superAdmin');
  } catch (error) {
    throw new Error('falied to create super admin')
  }
}