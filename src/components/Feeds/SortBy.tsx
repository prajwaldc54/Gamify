import React, { useState } from 'react';
import {
  Center,
  Menu,
  MenuButton,
  MenuList,
  Text,
  MenuItem,
  Button,
} from '@chakra-ui/react';
import { notePlus, star, checkCircle } from 'assets/icons';
import { ImageIcon } from 'components/Common/ImageIcon';
import { MenuDown } from 'assets/icons/createpost';
import { PostSortByEnum } from 'Schema/Schema';

type SortByType = {
  onChangeSortBy: (sortBy: PostSortByEnum) => void;
  defaultValue: PostSortByEnum;
};

const SortBy: React.FC<SortByType> = (props) => {
  const { onChangeSortBy, defaultValue } = props;
  const [sortBy, setSortBy] = useState<PostSortByEnum>(defaultValue);

  const sortByOptions = {
    [PostSortByEnum.LATEST]: 'Latest posts',
    [PostSortByEnum.POPULARITY]: 'Popularity',
    [PostSortByEnum.HELPFULNESS]: 'Helpful',
  };

  const handleSelection = (sortBy: PostSortByEnum) => {
    setSortBy(sortBy);
    onChangeSortBy(sortBy);
  };

  return (
    <Menu>
      <MenuButton as={Button} variant="link" px={0}>
        <Center>
          <Text fontSize="md" mr="7px">
            {sortByOptions[sortBy]}
          </Text>
          <ImageIcon size="16px" opacity={0.75} src={MenuDown} />
        </Center>
      </MenuButton>
      <MenuList>
        <MenuItem
          onClick={() => {
            handleSelection?.(PostSortByEnum.LATEST);
          }}>
          <ImageIcon size="22px" opacity={0.75} src={notePlus} />
          <span>Latest posts</span>
        </MenuItem>
        <MenuItem
          onClick={() => {
            handleSelection?.(PostSortByEnum.POPULARITY);
          }}>
          <ImageIcon size="22px" opacity={0.75} src={star} />
          <span>Popularity</span>
        </MenuItem>
        <MenuItem
          onClick={() => {
            handleSelection?.(PostSortByEnum.HELPFULNESS);
          }}>
          <ImageIcon size="22px" opacity={0.75} src={checkCircle} />
          <span>Helpful</span>
        </MenuItem>
      </MenuList>
    </Menu>
  );
};

export default SortBy;
