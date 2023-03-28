import { Service } from 'typedi';
import { Repository } from 'typeorm';
import { dataSource } from '../../ormconfig';
import { Class } from '../entities';

@Service()
export class ClassRepository extends Repository<Class> {
    public async getClassById(id: number): Promise<Class> {
        return dataSource.manager
            .createQueryBuilder(Class, "class")
            .where("class.id = :id", { id: id })
            .getOne().catch((ex) => {
                throw ex;
            });
    }
}
