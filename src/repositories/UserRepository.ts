import { Repository } from 'typeorm';
import { Service } from 'typedi';
import { User, UserInfo } from '../entities';
import { dataSource } from '../../ormconfig';

@Service()
export class UserRepository extends Repository<User> {
  public async getUserByEmail(email: string): Promise<User> {
    return await dataSource.manager
      .createQueryBuilder(User, "user")
      .where("user.email = :email", { email: email })
      .getOne().catch((ex) => {
        throw ex;
      });
  }


  public async getUserById(id: string): Promise<User> {
    return await dataSource.manager
      .createQueryBuilder(User, "user")
      .where("user.id = :id", { id: id })
      .getOne().catch((ex) => {
        throw ex;
      });
  }


  public async getUserInfoById(id: string): Promise<UserInfo> {
    return await dataSource.manager
      .createQueryBuilder(UserInfo, "userInfo")
      .where("userInfo.user = :user", { user: id })
      .getOne().catch((ex) => {
        throw ex;
      });
  }


  public async getListUser(): Promise<User[]> {
    return await dataSource
      .getRepository(User)
      .createQueryBuilder("user")
      .select(["user.id", "user.email", "user.role"])
      .leftJoin("user.userInfo", "userInfo")
      .addSelect(["userInfo.fullname", "userInfo.birthday"])
      .leftJoin("user.class", "class")
      .addSelect(["class.id", "class.className"])
      .getRawMany().catch((ex) => {
        throw ex;
      });
  }


  public async getDetailUserById(id: string): Promise<User> {
    return await dataSource
      .getRepository(User)
      .createQueryBuilder("user")
      .select(["user.id", "user.email", "user.role"])
      .leftJoin("user.userInfo", "userInfo")
      .addSelect(["userInfo.fullname", "userInfo.birthday"])
      .leftJoin("user.class", "class")
      .addSelect(["class.id", "class.className"])
      .where("user.id = :id", { id: id })
      .getRawOne().catch((ex) => {
        throw ex;
      });
  }

}
