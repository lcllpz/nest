import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
// 定义schema
const typeDefs = `
  type Employee {
    id: String
    name: String
    sex: String
    age: Int
  }

  type Department {
    id: String
    name: String
    employees: [Employee]
  }

  type Query {
    employees: [Employee],
    departments: [Department],
    employeesByDepartmentName(name: String!): [Employee]
  }

  type Res {
    success: Boolean
    id: String
  }

  type Mutation {
    addEmployee(name: String! age:Int! sex:String!): Res
    updateEmployee(id: String! name: String! age:Int! sex:String!): Res
    deleteEmployee(id: String!): Res
  }
  
  schema {
    query: Query,
    mutation: Mutation
  }
`;

let employees = [
  {
    id: "1",
    name: async () => {
      await "取数据";
      return "jack";
    },
    sex: "男",
    age: 18,
  },
  {
    id: "2",
    name: "rose",
    sex: "女",
    age: 20,
  },
  {
    id: "3",
    name: "tom",
    sex: "男",
    age: 31,
  },
];

const departments = [
  {
    id: "1",
    name: "技术部",
    employees: employees,
  },
];

async function addEmployee(_, { name, age, sex }) { 
  employees.push({
    id: Math.ceil(Math.random() * 100) + "",
    name,
    age,
    sex
  })

  return {
    success: true,
    id: Math.ceil(Math.random() * 100) + ""
  }
}

async function updateEmployee(_, { id, name, age, sex }) { 
  employees.forEach((item) => {
    if (item.id === id) {
      item.name = name;
      item.age = age;
      item.sex = sex;
    }
  });
  return {
    success: true,
    id
  }
}

async function deleteEmployee(_, { id }) {
  employees = employees.filter((item) => item.id !== id);
  return {
    success: true,
    id
  }
}

// 定义resolvers
const resolvers = {
  Query: {
    employees: () => employees,
    departments: () => departments,
    employeesByDepartmentName: async (_, { name }) => { 
      console.log(name);
      await "异步查询操作";
      return name === "技术部" ? employees : [];
    }
  },
  Mutation: {
    addEmployee,
    updateEmployee,
    deleteEmployee
  }
};

const server = new ApolloServer({ typeDefs, resolvers });

const { url } = await startStandaloneServer(server, {
  listen: { port: 4000 },
});

console.log(`graphql服务监听在 ${url}`);