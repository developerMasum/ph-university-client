import { Layout, Menu } from "antd";
import { sidebarItemGenerator } from "../../utils/sidebarItemGenerator";
import { AdminPaths } from "../../routes/admin.routes";
import { FacultyPaths } from "../../routes/faulty.routes";
import { useAppSelector } from "../../routes/features/hooks";
import { selectCurrentUser } from "../../routes/features/auth/authSlice";
const { Sider } = Layout;

const Sidebar = () => {

  const userRole = {
    ADMIN: "admin",
    FACULTY: "faculty",
    STUDENT: "student",
  };
  // const role = "faculty";
  const user = useAppSelector(selectCurrentUser)
  let sidebarItems;
  // console.log(sidebarItems);

  switch (user!.role) {
    case userRole.ADMIN:
     sidebarItems =  sidebarItemGenerator(AdminPaths, userRole.ADMIN);
     break;
    case userRole.FACULTY:
     sidebarItems =  sidebarItemGenerator(FacultyPaths, userRole.FACULTY);
     break;
    case userRole.STUDENT:
     sidebarItems =  sidebarItemGenerator(AdminPaths, userRole.STUDENT);
      break;

    default:
      break;
  }

  return (
    <Sider breakpoint="lg" collapsedWidth="0">
      <div
        style={{
          color: "white",
          height: "4rem",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <p>PH University</p>
      </div>
      <Menu
        theme="dark"
        mode="inline"
        defaultSelectedKeys={["4"]}
        items={sidebarItems}
      />
    </Sider>
  );
};

export default Sidebar;
