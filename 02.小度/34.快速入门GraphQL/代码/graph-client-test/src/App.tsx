import { gql, useQuery, useMutation } from "@apollo/client";

const getEmployees = gql`
  query Employees {
    employees {
      id
      name
      age
      sex
    }
  }
`;

const addEmployee = gql`
  mutation Mutation($name: String!, $age: Int!, $sex: String!) {
    addEmployee(name: $name, age: $age, sex: $sex) {
      id
      success
    }
  }
`;
type Employee = {
  id: string;
  name: string;
  sex: string;
  age: number;
};

type EmployeeList = {
  employees: Array<Employee>;
};

function App() {
  const { loading, error, data } = useQuery<EmployeeList>(getEmployees);

  const [createEmployee] = useMutation(addEmployee, {
    refetchQueries: [getEmployees],
  });

  async function onClick() {
    await createEmployee({
      variables: {
        name: "lucy",
        age: 30,
        sex: "女",
      },
    });
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
              {emp.name} --- {emp.age} --- {emp.sex}
            </li>
          );
        })}
      </ul>
    </>
  );
}

export default App;
