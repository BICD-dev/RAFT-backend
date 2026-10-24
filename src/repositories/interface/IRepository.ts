export interface IRepository <T>{
    // create entity
    create(entity: T): Promise<void>;

    // read entity
    read(id: string): Promise<T | null>;


    // update entity
    update(id: string, entity: Partial<T>): Promise<T | null>;

    // delete entity
    delete(id: string): Promise<boolean>;
}