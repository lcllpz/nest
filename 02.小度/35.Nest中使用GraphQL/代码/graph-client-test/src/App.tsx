import { gql, useQuery, useMutation } from "@apollo/client";

const getEmployees = gql`
  query Query {
    employees {
      id
      name
      sex
      age
      department {
        id
        name
      }
    }
  }
`;

const addEmployee = gql`
  mutation Mutation($input: CreateEmployeeInput) {
    addEmployee(input: $input) {
      id
      success
    }
  }
`

// const addEmployee = gql`
//   mutation Mutation($name: String!, $age: Int!, $sex: String!) {
//     addEmployee(name: $name, age: $age, sex: $sex) {
//       id
//       success
//     }
//   }
// `
type Employee = {
  id: string;
  name: string;
  sex: string;
  age: number;
  department: Department
};
type Department = {
  id: string;
  name: string;
}

type EmployeeList = {
  employees: Array<Employee>;
};

function App() {
  const { loading, error, data } = useQuery<EmployeeList>(getEmployees);

  const [createEmployee] = useMutation(addEmployee, {
    refetchQueries: [getEmployees]
  })

  async function onClick() { 
    await createEmployee({
      variables: {
        "input": {
          "name": "rose",
          "sex": "女",
          "age": 22,
          "department": {
            "id": 2
          }
        }
      }
    })
  }

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;
  return (
    <>
      <button onClick={onClick}>新增</button>
      <ul>
        {data?.employees?.map((emp) => {
          return (
            <li key={emp.id}>
              { emp.name } --- { emp.age } --- {emp.sex} --- {emp.department.name}
            </li>
          );
        })}
      </ul>
      
    </>
  );
}

export default App;
