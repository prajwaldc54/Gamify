import React from 'react';
import { Flex } from '@chakra-ui/react';
import { PostFilterParamType, PostSortByEnum } from 'Schema/Schema';
import SortBy from './SortBy';
import Filter from './Filter';

type FeedHeaderMenuProps = {
  isMobileView: boolean;
  onChangeSortBy?: (sortBy: PostSortByEnum) => void;
  defaultSortByValue: PostSortByEnum;
  onSubmitFilter: (filter: PostFilterParamType) => void;
};

const FeedHeaderMenu: React.FC<FeedHeaderMenuProps> = (props) => {
  const { onSubmitFilter, onChangeSortBy, defaultSortByValue, isMobileView } =
    props;
  return (
    <Flex
      justifyContent="flex-end"
      align="center"
      color="secondary.500"
      fontSize="sm">
      {!isMobileView && (
        <Flex ml="27px">
          <SortBy
            onChangeSortBy={(sortBy) => onChangeSortBy?.(sortBy)}
            defaultValue={defaultSortByValue}
          />
        </Flex>
      )}

      <Flex ml="27px">
        <Filter
          onSubmit={(filter) => onSubmitFilter?.(filter)}
          isMobileView={isMobileView}
        />
      </Flex>
    </Flex>
  );
};

export default FeedHeaderMenu;
