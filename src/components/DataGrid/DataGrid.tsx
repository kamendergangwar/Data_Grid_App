import React, { useEffect, useState } from 'react';
import Pagination from '../Pagination/Pagination';
import Filter from '../Filter/Filter';
import Search from '../Search/Search';
import { getUsers, getPosts, getComments } from '../../services/api';

interface User {
  id: number;
  name: string;
  email: string;
}

interface Post {
  id: number;
  userId: number;
  title: string;
  body: string;
}

interface Comment {
  id: number;
  postId: number;
  name: string;
  email: string;
  body: string;
}

const PAGE_SIZE = 10;

const DataGrid: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [posts, setPosts] = useState<Post[]>([]);
  const [comments, setComments] = useState<Comment[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [filterAttribute, setFilterAttribute] = useState('');
  const [filterValue, setFilterValue] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const usersData = await getUsers();
        setUsers(usersData);
        setFilteredUsers(usersData);
        setTotalPages(Math.ceil(usersData.length / PAGE_SIZE));
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const postsData = await getPosts();
        setPosts(postsData);
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const commentsData = await getComments();
        setComments(commentsData);
      } catch (error) {
        console.error('Error fetching comments:', error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const filtered = users.filter((user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (filterAttribute && filterValue) {
      const filteredByAttribute = filtered.filter(
        (user) => user[filterAttribute as keyof User] === filterValue
      );
      setFilteredUsers(filteredByAttribute);
      setTotalPages(Math.ceil(filteredByAttribute.length / PAGE_SIZE));
    } else {
      setFilteredUsers(filtered);
      setTotalPages(Math.ceil(filtered.length / PAGE_SIZE));
    }

    setCurrentPage(1);
  }, [users, filterAttribute, filterValue, searchTerm]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };
 
  
  const handlePreviousPage = () => {
    setCurrentPage((prevPage) => prevPage - 1);
  };
  
  const handleNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };
  const handleSearch = (searchTerm: string) => {
    setSearchTerm(searchTerm);
  };

  const handleFilterChange = (attribute: string, value: string) => {
    setFilterAttribute(attribute);
    setFilterValue(value);
  };

  const startIndex = (currentPage - 1) * PAGE_SIZE;
  const endIndex = startIndex + PAGE_SIZE;
  const visibleUsers = filteredUsers.slice(startIndex, endIndex);

  const getPostTitle = (postId: number): string => {
    const post = posts.find((post) => post.id === postId);
    return post ? post.title : '';
  };

  const getPostComments = (postId: number): Comment[] => {
    return comments.filter((comment) => comment.postId === postId);
  };


return (
  <div className="data-grid">
    <div>
      <h2>Users</h2>
      <Search onSearch={handleSearch} />
      <Filter options={['name', 'email']} onFilterChange={handleFilterChange} />
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          {visibleUsers.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
        onPreviousPage={handlePreviousPage}
        onNextPage={handleNextPage}
      />
    </div>
    <div>
      <h2>Posts</h2>
      <Search onSearch={handleSearch} />
      <Filter options={['Title', 'User']} onFilterChange={handleFilterChange} />
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>User</th>
          </tr>
        </thead>
        <tbody>
          {posts.slice(startIndex, endIndex).map((post) => (
            <tr key={post.id}>
              <td>{post.id}</td>
              <td>{post.title}</td>
              <td>{getPostTitle(post.userId)}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
        onPreviousPage={handlePreviousPage}
        onNextPage={handleNextPage}
      />
    </div>
    <div>
      <h2>Comments</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Post</th>
          </tr>
        </thead>
        <tbody>
          {comments.slice(startIndex, endIndex).map((comment) => (
            <tr key={comment.id}>
              <td>{comment.id}</td>
              <td>{comment.name}</td>
              <td>{comment.email}</td>
              <td>{getPostTitle(comment.postId)}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
        onPreviousPage={handlePreviousPage}
        onNextPage={handleNextPage}
      />
    </div>
  </div>
);

    
  
};

export default DataGrid;
