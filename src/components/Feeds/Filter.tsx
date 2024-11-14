import React, { useState } from 'react';
import {
  Center,
  Text,
  Popover,
  PopoverTrigger,
  Button,
  Portal,
  PopoverContent,
  PopoverHeader,
  PopoverCloseButton,
  PopoverBody,
  useDisclosure,
} from '@chakra-ui/react';
import { filterMenu, filterPlus } from 'assets/icons';
import { ImageIcon } from 'components/Common/ImageIcon';
import {
  PostFilterTypeEnum,
  Team,
  TeamFilterEnum,
  PostFilterViewEnum,
  PostFilterParamType,
  PostSortByEnum,
} from 'Schema/Schema';
import FilterForm from './FilterForm';
import SelectTeam from './SelectTeam';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

type FilterProps = {
  onSubmit?: (filter: PostFilterParamType) => void;
  isMobileView: boolean;
};

const Filter: React.FC<FilterProps> = (props) => {
  dayjs.extend(relativeTime);
  const prevDate = dayjs().subtract(1, 'month').format('YYYY-MM-DD');
  const currentDate = dayjs().format('YYYY-MM-DD');
  const [sortBy, setSortBy] = useState<PostSortByEnum>(PostSortByEnum.LATEST);
  const [type, setType] = useState<PostFilterTypeEnum>(PostFilterTypeEnum.ALL);
  const [startDate, setStartDate] = useState<string>(prevDate);
  const [endDate, setEndDate] = useState<string>(currentDate);
  const [teamFilterType, setTeamFilterType] = useState<TeamFilterEnum>(
    TeamFilterEnum.ALL_TEAMS
  );
  const [selectedTeams, setSelectedTeams] = useState<Team['id'][]>([]);
  const [viewType, setViewType] = useState<PostFilterViewEnum>(
    PostFilterViewEnum.FILTER_VIEW
  );
  const { onSubmit, isMobileView } = props;

  const { onOpen, onClose, isOpen } = useDisclosure();
  const firstFieldRef = React.useRef(null);

  const onSubmitForm = () => {
    const filters: PostFilterParamType = {};
    if (teamFilterType !== TeamFilterEnum.ALL_TEAMS) {
      filters['teamIds'] = selectedTeams;
    }
    if (sortBy !== PostSortByEnum.LATEST && isMobileView) {
      filters['sortBy'] = sortBy;
    }
    if (type !== PostFilterTypeEnum.ALL) {
      filters['type'] = type;
    }
    if (startDate && endDate) {
      filters['startDate'] = dayjs(startDate).format('YYYY-MM-DD');
      filters['endDate'] = dayjs(endDate).format('YYYY-MM-DD');
    }
    onClose();
    onSubmit && onSubmit(filters);
  };
  return (
    <Popover
      isOpen={isOpen}
      initialFocusRef={firstFieldRef}
      onOpen={onOpen}
      onClose={onClose}>
      <PopoverTrigger>
        <Center as={Button} variant="link" px={0}>
          {isMobileView ? (
            <>
              <ImageIcon src={filterMenu} />
            </>
          ) : (
            <>
              <Text fontSize="md" pr={1}>
                Filter
              </Text>
              <ImageIcon size="20px" opacity={0.75} src={filterPlus} />
            </>
          )}
        </Center>
      </PopoverTrigger>
      <Portal>
        <PopoverContent minWidth="fit-content">
          <PopoverHeader fontSize="18px" fontWeight="bold">
            Filters
          </PopoverHeader>
          <PopoverCloseButton
            borderWidth="1px"
            borderColor="black.500"
            rounded="6px"
            color="black.500"
            top="9px"
          />
          <PopoverBody>
            {viewType === PostFilterViewEnum.FILTER_VIEW && (
              <FilterForm
                sortBy={sortBy}
                setSortBy={setSortBy}
                type={type}
                setType={setType}
                startDate={startDate}
                setStartDate={setStartDate}
                endDate={endDate}
                setEndDate={setEndDate}
                teamFilterType={teamFilterType}
                setTeamFilterType={setTeamFilterType}
                setViewType={setViewType}
                onSubmit={onSubmitForm}
                onClose={onClose}
                isMobileView={isMobileView}
              />
            )}
            {viewType === PostFilterViewEnum.SELECT_TEAM_VIEW && (
              <SelectTeam
                selectedTeams={selectedTeams}
                setSelectedTeams={setSelectedTeams}
                setViewType={setViewType}
                onTeamsSelected={() =>
                  setTeamFilterType(TeamFilterEnum.SPECIFIC_TEAM)
                }
              />
            )}
          </PopoverBody>
        </PopoverContent>
      </Portal>
    </Popover>
  );
};

export default Filter;
