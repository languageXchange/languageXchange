import { Action, createReducer, on } from '@ngrx/store';

// Interface Imports
import { Message } from 'src/app/models/Message';
import { RoomStateInterface } from 'src/app/models/types/states/roomState.interface';

// Action Imports
import { deactivateRoomAction } from 'src/app/store/actions/message.action';
import {
  deleteAccountSuccessAction,
  logoutSuccessAction,
} from 'src/app/store/actions/auth.action';
import {
  getRoomsAction,
  getRoomsSuccessAction,
  getRoomsFailureAction,
  getRoomsWithOffsetAction,
  getRoomsWithOffsetSuccessAction,
  getRoomsWithOffsetFailureAction,
} from 'src/app/store/actions/rooms.action';
import {
  createRoomAction,
  createRoomFailureAction,
  createRoomSuccessAction,
  getRoomAction,
  getRoomFailureAction,
  getRoomSuccessAction,
  getRoomByIdAction,
  getRoomByIdFailureAction,
  getRoomByIdSuccessAction,
  createRoomInitialStateAction,
} from 'src/app/store/actions/room.action';
import {
  findRoomAndAddMessageAction,
  findAndUpdateRoomUpdatedAtAction,
  findOrAddRoomAction,
  findOrAddRoomSuccessAction,
  findOrAddRoomFailureAction,
  findRoomAndUpdateMessageSeenAction,
} from 'src/app/store/actions/notification.action';

const initialState: RoomStateInterface = {
  isLoading: false,
  total: null,
  rooms: null,
  error: null,
  createRoomError: null,
};

const roomReducer = createReducer(
  initialState,

  // Get Rooms Reducers
  on(
    getRoomsAction,
    (state): RoomStateInterface => ({
      ...state,
      isLoading: true,
      error: null,
    })
  ),
  on(
    getRoomsSuccessAction,
    (state, action): RoomStateInterface => ({
      ...state,
      isLoading: false,
      total: action.payload?.total,
      rooms: action.payload?.documents,
    })
  ),
  on(
    getRoomsFailureAction,
    (state, action): RoomStateInterface => ({
      ...state,
      isLoading: false,
      error: action.error,
    })
  ),

  on(
    getRoomsWithOffsetAction,
    (state): RoomStateInterface => ({
      ...state,
      isLoading: true,
      error: null,
    })
  ),
  on(
    getRoomsWithOffsetSuccessAction,
    (state, action): RoomStateInterface => ({
      ...state,
      isLoading: false,
      total: action.payload?.total,
      rooms: [...state.rooms, ...action.payload?.documents],
    })
  ),
  on(
    getRoomsWithOffsetFailureAction,
    (state, action): RoomStateInterface => ({
      ...state,
      isLoading: false,
      error: action.error,
    })
  ),

  // Get Room Reducers
  on(
    getRoomAction,
    (state): RoomStateInterface => ({
      ...state,
      isLoading: true,
      error: null,
    })
  ),
  on(
    getRoomSuccessAction,
    (state, action): RoomStateInterface => ({
      ...state,
      isLoading: false,
      rooms: [action.payload, ...(state.rooms || [])],
    })
  ),
  on(
    getRoomFailureAction,
    (state, action): RoomStateInterface => ({
      ...state,
      isLoading: false,
      error: action.error,
    })
  ),

  // Create Room Reducers
  on(
    createRoomAction,
    (state): RoomStateInterface => ({
      ...state,
      isLoading: true,
      error: null,
    })
  ),
  on(createRoomSuccessAction, (state, action): RoomStateInterface => {
    const updatedRooms = state.rooms ? [...state.rooms] : [];
    const roomIndex = updatedRooms.findIndex(
      (room) => room.$id === action.payload.$id
    );

    if (roomIndex !== -1) {
      // If room exists, update it
      updatedRooms[roomIndex] = action.payload;
    } else {
      // If room does not exist, add it
      updatedRooms.push(action.payload);
    }

    return {
      ...state,
      isLoading: false,
      rooms: updatedRooms,
    };
  }),
  on(
    createRoomFailureAction,
    (state, action): RoomStateInterface => ({
      ...state,
      isLoading: false,
      createRoomError: action.error,
    })
  ),
  on(
    createRoomInitialStateAction,
    (state): RoomStateInterface => ({
      ...state,
      createRoomError: null,
    })
  ),

  // Get Room By Id Reducers
  on(
    getRoomByIdAction,
    (state): RoomStateInterface => ({
      ...state,
      isLoading: true,
      error: null,
    })
  ),
  on(
    getRoomByIdSuccessAction,
    (state, action): RoomStateInterface => ({
      ...state,
      isLoading: false,
      rooms: [action.payload, ...(state.rooms || [])],
    })
  ),
  on(
    getRoomByIdFailureAction,
    (state, action): RoomStateInterface => ({
      ...state,
      isLoading: false,
      error: action.error,
    })
  ),

  // Deactivate Room Reducers
  on(deactivateRoomAction, (state, action): RoomStateInterface => {
    return {
      ...state,
      rooms: state.rooms.map((room) =>
        room.$id === action.payload.$id ? action.payload : room
      ),
    };
  }),

  // Find And Update Room Reducer
  on(findAndUpdateRoomUpdatedAtAction, (state, action): RoomStateInterface => {
    // Create a new array with the updated room
    const updatedRooms = state.rooms?.map((room) =>
      room.$id === action.payload.$id
        ? { ...room, $updatedAt: action.payload.$updatedAt }
        : room
    );

    // Sort rooms by $updatedAt in descending order
    const sortedRooms = updatedRooms?.sort(
      (a, b) =>
        new Date(b.$updatedAt).getTime() - new Date(a.$updatedAt).getTime()
    );
    // Return the new state
    return { ...state, rooms: sortedRooms };
  }),

  // Find And Update Room Message Reducer
  on(findRoomAndAddMessageAction, (state, action): RoomStateInterface => {
    // Create a new array with the updated room
    const updatedRooms = state.rooms?.map((room) => {
      const payload: Message = {
        ...action.payload,
        roomId: action.payload.roomId.$id,
      };

      return room.$id === action.payload.roomId.$id
        ? {
            ...room,
            messages: [...(room.messages || []), payload],
          }
        : room;
    });

    // Sort rooms by $updatedAt in descending order
    const sortedRooms = updatedRooms?.sort(
      (a, b) =>
        new Date(b.$updatedAt).getTime() - new Date(a.$updatedAt).getTime()
    );
    // Return the new state
    return { ...state, rooms: sortedRooms };
  }),

  // Find And Update Room Message Seen Reducer
  on(
    findRoomAndUpdateMessageSeenAction,
    (state, action): RoomStateInterface => {
      // Create a new array with the updated room
      const updatedRooms = state.rooms?.map((room) => {
        const updatedMessages = room.messages?.map((message) =>
          message.$id === action.payload.$id
            ? { ...message, seen: true }
            : message
        );

        return room.$id === action.payload.roomId.$id
          ? {
              ...room,
              messages: updatedMessages,
            }
          : room;
      });

      // Sort rooms by $updatedAt in descending order
      const sortedRooms = updatedRooms?.sort(
        (a, b) =>
          new Date(b.$updatedAt).getTime() - new Date(a.$updatedAt).getTime()
      );
      // Return the new state
      return { ...state, rooms: sortedRooms };
    }
  ),

  // Find Or Add Room Reducer
  on(
    findOrAddRoomAction,
    (state): RoomStateInterface => ({
      ...state,
      isLoading: true,
      error: null,
    })
  ),
  on(findOrAddRoomSuccessAction, (state, action): RoomStateInterface => {
    // Check if the room already exists
    const roomExists = state.rooms?.find(
      (room) => room.$id === action.payload.$id
    );

    // If the room already exists, return the state
    if (roomExists) return { ...state };

    // If the room doesn't exist, add the room to the state
    const updatedRooms = [action.payload, ...(state.rooms || [])];

    // Sort rooms by $updatedAt in descending order
    const sortedRooms = updatedRooms.sort(
      (a, b) =>
        new Date(b.$updatedAt).getTime() - new Date(a.$updatedAt).getTime()
    );

    // If the room doesn't exist, add the room to the state
    return {
      ...state,
      isLoading: false,
      rooms: sortedRooms,
    };
  }),
  on(
    findOrAddRoomFailureAction,
    (state, action): RoomStateInterface => ({
      ...state,
      isLoading: false,
      error: action.error,
    })
  ),

  // Set initialState after Logout/Delete Success Action
  on(
    logoutSuccessAction,
    deleteAccountSuccessAction,
    (): RoomStateInterface => ({
      ...initialState,
    })
  )
);

export function roomReducers(state: RoomStateInterface, action: Action) {
  return roomReducer(state, action);
}
